import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';  // To load environment variables
import cors from 'cors';  // For enabling CORS
import bodyParser from 'body-parser';
import User from './models/User.js';  // Import the User model
import bcrypt from 'bcrypt';  // For hashing passwords

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();
const port = 5000;

// Middleware setup
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse incoming JSON requests

// MongoDB connection
const mongoURI = process.env.MONGODB_URL;  // Get MongoDB URI from environment variables
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// POST route for adding a user
app.post('/api/add-user', async (req, res) => {
  const { name, email, phone, password, role, employeeId } = req.body;

  // Check if any of the required fields are missing
  if (!name || !email || !phone || !password || !role || !employeeId) {
    return res.status(400).json({
      success: false,
      message: 'All fields (name, email, phone, password, role, employeeId) are required.'
    });
  }

  try {
    // Check if user already exists by email or phone
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email or phone.' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      employeeId
    });

    // Save the new user in the database
    await newUser.save();
    res.status(200).send({ success: true, message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Error adding user' });
  }
});

// GET route for fetching all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
