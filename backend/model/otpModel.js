import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    otp: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: ["registration", "login"],
        default: "login"
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // MongoDB TTL index to auto-remove expired documents
    }
}, { timestamps: true });

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
