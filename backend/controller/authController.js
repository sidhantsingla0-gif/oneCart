import User from "../model/userModel.js";
import Otp from "../model/otpModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken,genToken1 } from "../config/token.js";
import { sendOtpEmail } from "../utils/sendEmail.js";

// Step 1 of Registration: Validate input, create OTP & send verification email
export const sendRegistrationOtp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || name.trim().length < 2) {
            return res.status(400).json({ message: "Name must be at least 2 characters long" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existUser = await User.findOne({ email: normalizedEmail });
        if (existUser) {
            return res.status(400).json({ message: "An account with this email already exists" });
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.deleteMany({ email: normalizedEmail, purpose: "registration" });
        await Otp.create({
            email: normalizedEmail,
            otp: otpCode,
            purpose: "registration",
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });

        await sendOtpEmail(normalizedEmail, otpCode, "registration");
        return res.status(200).json({ 
            requireOtp: true, 
            email: normalizedEmail, 
            message: "A 6-digit verification code has been sent to your email." 
        });
    } catch (error) {
        console.error("sendRegistrationOtp error:", error);
        return res.status(500).json({ message: `Failed to send verification code: ${error.message}` });
    }
};

// Step 2 of Registration: Verify OTP and create user account
export const verifyRegistrationOtp = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and verification code are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const record = await Otp.findOne({ 
            email: normalizedEmail, 
            otp: otp.trim(), 
            purpose: "registration" 
        });

        if (!record) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        if (record.expiresAt < new Date()) {
            await Otp.deleteOne({ _id: record._id });
            return res.status(400).json({ message: "Verification code has expired. Please request a new one." });
        }

        await Otp.deleteOne({ _id: record._id });

        const existUser = await User.findOne({ email: normalizedEmail });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const safeUser = user.toObject();
        delete safeUser.password;
        return res.status(201).json({ user: safeUser, message: "Registration successful!" });
    } catch (error) {
        console.error("verifyRegistrationOtp error:", error);
        return res.status(500).json({ message: `Registration verification error: ${error.message}` });
    }
};

// Standard fallback registration
export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const normalizedEmail = (email || "").toLowerCase().trim();
        const existUser = await User.findOne({ email: normalizedEmail });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if(!validator.isEmail(normalizedEmail)){
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        if(password.length < 8){
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        })
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        const safeUser = user.toObject();
        delete safeUser.password;
        return res.status(201).json({ user: safeUser });
    } catch (error) {
        console.log("registration error");
        return res.status(500).json({ message: `registration error ${error}` });
    }
}

// Step 1 of Login: Verify password and send 2-step verification code
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const normalizedEmail = (email || "").toLowerCase().trim();
        let user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate 6-digit OTP for 2-step verification
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.deleteMany({ email: normalizedEmail, purpose: "login" });
        await Otp.create({
            email: normalizedEmail,
            otp: otpCode,
            purpose: "login",
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });

        await sendOtpEmail(normalizedEmail, otpCode, "login");

        return res.status(200).json({ 
            requireOtp: true, 
            email: normalizedEmail, 
            message: "A 6-digit verification code has been sent to your email." 
        });
    } catch (error) {
        console.log("login error", error);
        return res.status(500).json({ message: `login error ${error}` });
    }
}

// Step 2 of Login: Verify OTP and issue JWT session cookie
export const verifyLoginOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and verification code are required" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const record = await Otp.findOne({ 
            email: normalizedEmail, 
            otp: otp.trim(), 
            purpose: "login" 
        });

        if (!record) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        if (record.expiresAt < new Date()) {
            await Otp.deleteOne({ _id: record._id });
            return res.status(400).json({ message: "Verification code has expired. Please request a new one." });
        }

        await Otp.deleteOne({ _id: record._id });

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,        
            sameSite: "none",     
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const safeUser = user.toObject();
        delete safeUser.password;
        return res.status(200).json({ user: safeUser, message: "Login successful!" });
    } catch (error) {
        console.log("verifyLoginOtp error", error);
        return res.status(500).json({ message: `verifyLoginOtp error ${error.message}` });
    }
};

// Resend OTP for either registration or login
export const resendOtp = async (req, res) => {
    try {
        const { email, purpose = "login" } = req.body;
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ message: "Valid email is required" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        if (purpose === "login") {
            const user = await User.findOne({ email: normalizedEmail });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.deleteMany({ email: normalizedEmail, purpose });
        await Otp.create({
            email: normalizedEmail,
            otp: otpCode,
            purpose,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });

        await sendOtpEmail(normalizedEmail, otpCode, purpose);
        return res.status(200).json({ message: "A new verification code has been sent to your email." });
    } catch (error) {
        console.error("resendOtp error:", error);
        return res.status(500).json({ message: `Failed to resend code: ${error.message}` });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("logout error");
        return res.status(500).json({ message: `logout error ${error}` });
    }
}


export const googleLogin = async (req, res) => {
    try {
        let { name, email } = req.body;
        let existUser = await User.findOne({ email });

        if (!existUser) {
            const randomPassword = Math.random().toString(36).slice(-10);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            existUser = await User.create({
                name,
                email,
                password: hashedPassword
            });
        }

        let token = await genToken(existUser._id);
        res.cookie("token", token, {
    httpOnly: true,
    secure: true,        
    sameSite: "none",      
    maxAge: 7 * 24 * 60 * 60 * 1000
});
        const safeUser = existUser.toObject();
        delete safeUser.password;
        return res.status(200).json({ user: safeUser });
    } catch (error) {
        console.log("googleLogin error", error);
        return res.status(500).json({ message: `googleLogin error ${error}` });
    }
}

export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = await genToken1(email);
res.cookie("token", token, {
    httpOnly: true,
    secure: true,        
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
            return res.status(200).json({ message: "Admin logged in successfully" });
        }
        return res.status(401).json({ message: "Invalid admin credentials" });
    } catch (error) {
        console.log("adminLogin error", error);
        return res.status(500).json({ message: `adminLogin error ${error}` });
    }
}

export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;
        if (!adminEmail) {
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({ email: adminEmail ,role:"admin"});
    } catch (error) {
        console.log("getAdmin error", error);
        return res.status(500).json({ message: `getAdmin error ${error}` });
    }
}
