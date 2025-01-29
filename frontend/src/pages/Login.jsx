
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // For OTP login
  const [otp, setOtp] = useState(""); // OTP field
  const [error, setError] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false); // For Terms and Privacy
  const [isOtpLogin, setIsOtpLogin] = useState(false); // Toggle between email/password and OTP login
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Disable the login button until the checkbox is checked
  }, [acceptTerms]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      setError("You must accept the Privacy Policy and Terms of Use.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", { email, password });
      if (response.data.success) {
        // Save user details in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        // Redirect based on role
        navigate(response.data.user.role === "admin" ? '/admin-dashboard' : '/employee-dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.error || "Server Error");
    }
  };

  const handlePhoneLogin = async () => {
    if (!phone) {
      setError("Phone number is required for OTP login.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/auth/otp-login", { phone });
      if (response.data.success) {
        alert("OTP sent to your phone.");
      }
    } catch (error) {
      setError("Failed to send OTP.");
    }
  };

  const toggleLoginMethod = () => {
    setIsOtpLogin(!isOtpLogin); // Toggle between OTP login and email/password login
  };

  const redirectToOtpLogin = () => {
    navigate('/otplogin'); // Redirect to OTP login page
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 to-gray-100 space-y-6">
      <h2 className="font-Libre text-4xl text-white shadow-md mb-6">Customer Relationship Management</h2>
      <div className="border shadow-lg p-8 w-80 bg-white rounded-xl hover:scale-105 transition-all">
        <h2 className="text-2xl font-semibold mb-4 text-teal-600">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!isOtpLogin ? (
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-teal-600"
                  onChange={() => setAcceptTerms(!acceptTerms)}
                />
                <span className="ml-2 text-gray-700 text-sm">
                  I accept company name <a href="/privacy-policy" className="text-teal-600">Privacy Policy</a> and <a href="/terms-of-use" className="text-teal-600">Terms of Use</a>
                </span>
              </label>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mb-4"
            >
              <button
                type="submit"
                className={`w-full py-2 rounded-md text-white ${acceptTerms ? 'bg-teal-600 hover:bg-teal-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!acceptTerms}
              >
                Login
              </button>
            </motion.div>
          </form>
        ) : (
          <form onSubmit={handlePhoneLogin}>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mb-4"
            >
              <button
                type="submit"
                className="w-full py-2 rounded-md text-white bg-teal-600 hover:bg-teal-700"
              >
                Send OTP
              </button>
            </motion.div>
          </form>
        )}

        <div className="text-center mt-4">
          {!isOtpLogin ? (
            <p className="text-sm">
              Don't have an account? <a href="/register" className="text-teal-600">Sign Up</a>
            </p>
          ) : (
            <p className="text-sm">
              Already have an account?{" "}
              <a onClick={toggleLoginMethod} className="text-teal-600 cursor-pointer">
                Login with Email/Password
              </a>
            </p>
          )}
          {!isOtpLogin && (
            <p className="text-sm mt-2">
              <a onClick={redirectToOtpLogin} className="text-teal-600 cursor-pointer">
                Log in with OTP
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;