import User from './models/User.js'
import bcrypt from 'bcrypt'
import connectToDatabase from './db/db.js'

const userRegister = async () => {
    connectToDatabase()
    try {
        const users = [
            {
                name: "Admin",
                email: "admin@gmail.com",
                password: "admin", // Plain text password
                role: "admin"
            },
            {
                name: "User1",
                email: "user1@gmail.com",
                password: "user1password", // Plain text password
                role: "employee" // Corrected typo here
            },
            {
                name: "User2",
                email: "user2@gmail.com",
                password: "user2password", // Plain text password
                role: "employee" // Corrected typo here
            },
            // Add more users as needed
        ];

        for (const user of users) {
            const hashPassword = await bcrypt.hash(user.password, 10);
            const newUser = new User({
                name: user.name,
                email: user.email,
                password: hashPassword,
                role: user.role
            });
            await newUser.save();
        }

        console.log('Users added successfully');
    } catch (error) {
        console.log(error);
    }
}

userRegister();
