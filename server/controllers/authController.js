// server/controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import twilio from 'twilio';  // Twilio for sending OTP


// Twilio client initialization
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Temporary OTP store (In production, use a more secure storage like a database)
let otpStore = {};


// Register a new user
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            res.status(401).json({success: false, error:"User Not Found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({success: false, error:"Incorrect Password"});
        }

        const token = jwt.sign({_id: user._id, role: user.role},
            process.env.JWT_KEY, {expiresIn: "20d"}
        )

        res.status(200).json({success: true, token, user: {_id: user._id, name: user.name, role: user.role}});
    }catch(error){
        res.status(500).json({success:false, error: error.message});
    }
};

const verify = async (req, res) => {
    return res.status(200).json({success: true, user: req.user});
}

const register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check if the user already exists by email or phone
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already exists with this email or phone number." });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();

        // Return a success message
        res.status(201).json({ success: true, message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error while registering user." });
    }
};

// Generate OTP and send it via SMS
const generateOtp = async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    client.messages
    .create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBE,
        to: phone
    })
    .then(() => {
        otpStore[phone] = otp;
        res.status(200).send({ success:true, otp });
    })
    .catch(err => {
        res.status(500).send({ success:false, message: err.message });
    });
};


// Verify OTP
const verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ message: "phone number and otp are required" });
    }

    const storedOtp = otpStore[phone];

    if (parseInt(otp) === storedOtp) {
        delete otpStore[phone];
        return res.json({ verified: true });
    } else {
        return res.json({ verified: false });
    }
};


export { login, verify, register, generateOtp, verifyOtp };
