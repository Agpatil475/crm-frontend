import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpLogin = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/auth/generate-otp", { phone });
            
            if (response.data.success) {
                alert("OTP sent to registered number");
            } else {
                alert("Error: " + response.data.error);
            }
        } catch (error) {
            // Handle errors from the backend
            alert("Failed to send OTP: " + error.message);
        }
    };
    
    

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/auth/verify-otp", { phone, otp });
            if (response.data.success) {
                navigate("/admin-dashboard");  // Redirect to dashboard after successful login
            }
        } catch (error) {
            setError(error.response?.data?.error || "Invalid OTP.");
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 to-gray-100 space-y-6">
            <h2 className="font-Libre text-4xl text-white shadow-md mb-6">Customer Relationship Management</h2>
            <div className="border shadow-lg p-8 w-80 bg-white rounded-xl hover:scale-105 transition-all">
                <h2 className="text-2xl font-semibold mb-4 text-teal-600">Login with OTP</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter your phone number"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <button onClick={handleSendOtp} className="w-full py-2 rounded-md text-white bg-teal-600 hover:bg-teal-700">
                        Send OTP
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <button onClick={handleVerifyOtp} className="w-full py-2 rounded-md text-white bg-teal-600 hover:bg-teal-700">
                        Verify OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpLogin;
