import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken,genToken1 } from "../config/token.js";


export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('Registration request:', { name, email, password: password ? '***' : '' }); // Log without password
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        if(password.length < 8){
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
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


export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
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
        return res.status(200).json({ user: safeUser });


    } catch (error) {
        console.log("login error");
        return res.status(500).json({ message: `login error ${error}` });
    }
}

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
