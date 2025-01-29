import { login, verify, register, generateOtp, verifyOtp } from '../controllers/authController.js';
import express from 'express';

const router = express.Router();

router.post('/login', login);
router.get('/verify', verify);
router.post('/register', register);  // New route for user registration
router.post('/generate-otp', generateOtp);  // New route for OTP generation
router.post('/verify-otp', verifyOtp);  // New route for OTP verification

export default router;
