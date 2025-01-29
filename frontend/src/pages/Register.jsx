import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);  // Error state for handling alerts only
    const [successMessage, setSuccessMessage] = useState(null);  // Success message state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/auth/register", { name, email, phone, password });

            if (response.data.success) {
                setSuccessMessage("Registration successful! You can now log in.");
                alert("Registration successful! You can now log in.");
                setTimeout(() => {
                    navigate('/login');
                }, 500);  // Delay for the alert to be visible
            }
        } catch (error) {
            setError(error.response?.data?.error || "Error occurred during registration.");
            // Show the error as an alert only
            alert(error.response?.data?.error || "Error occurred during registration.");
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 to-gray-100 space-y-6">
            <h2 className="font-Libre text-4xl text-white shadow-md mb-6">Customer Relationship Management</h2>

            {/* Success message displayed only at the top */}
            {successMessage && (
                <div className="w-full text-center py-2 bg-green-500 text-white">
                    <p>{successMessage}</p>
                </div>
            )}

            <div className="border shadow-lg p-8 w-80 bg-white rounded-xl hover:scale-105 transition-all">
                <h2 className="text-2xl font-semibold mb-4 text-teal-600">Register</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter Phone Number"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full py-2 rounded-md text-white bg-teal-600 hover:bg-teal-700">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
