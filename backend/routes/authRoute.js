import express from "express"
import { 
    login, 
    logout, 
    registration, 
    googleLogin, 
    adminLogin,
    sendRegistrationOtp,
    verifyRegistrationOtp,
    verifyLoginOtp,
    resendOtp
} from "../controller/authController.js"

const authRoutes = express.Router()

authRoutes.post('/registration', registration)
authRoutes.post('/send-registration-otp', sendRegistrationOtp)
authRoutes.post('/verify-registration-otp', verifyRegistrationOtp)
authRoutes.post('/login', login)
authRoutes.post('/verify-login-otp', verifyLoginOtp)
authRoutes.post('/resend-otp', resendOtp)
authRoutes.get('/logout', logout)
authRoutes.post('/googleLogin', googleLogin)
authRoutes.post('/adminLogin', adminLogin)

export default authRoutes