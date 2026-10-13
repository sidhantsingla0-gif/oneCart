import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp, purpose = "login") => {
    const isRegistration = purpose === "registration";
    const subject = isRegistration 
        ? "Your oneCart Registration Verification Code" 
        : "Your oneCart 2-Step Verification Login Code";

    const title = isRegistration
        ? "Verify Your Registration"
        : "2-Step Verification";

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #141414; color: #ffffff; border-radius: 10px;">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #333;">
                <h1 style="color: #6060f5; margin: 0;">oneCart</h1>
                <p style="color: #aaa; margin: 5px 0 0;">Secure Shopping Platform</p>
            </div>
            <div style="padding: 30px 20px; text-align: center;">
                <h2 style="color: #ffffff; margin-bottom: 10px;">${title}</h2>
                <p style="color: #ccc; font-size: 15px; line-height: 1.5;">
                    Use the 6-digit code below to complete your ${isRegistration ? "account registration" : "secure login"}.
                </p>
                <div style="margin: 30px 0;">
                    <span style="display: inline-block; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #6060f5; background: #1e1e2f; padding: 15px 30px; border-radius: 8px; border: 1px solid #43438a;">
                        ${otp}
                    </span>
                </div>
                <p style="color: #888; font-size: 13px;">This code is valid for <strong>5 minutes</strong>. Do not share this code with anyone.</p>
            </div>
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 12px;">
                &copy; ${new Date().getFullYear()} oneCart. If you did not request this, please ignore this email.
            </div>
        </div>
    `;

    // Check if email credentials exist
    const user = process.env.EMAIL_USER || process.env.SMTP_USER;
    const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

    if (user && pass) {
        try {
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE || "gmail",
                auth: { user, pass }
            });

            await transporter.sendMail({
                from: `"oneCart Security" <${user}>`,
                to: email,
                subject,
                html
            });
            console.log(`[Email Sent] OTP successfully delivered to ${email}`);
            return true;
        } catch (error) {
            console.error("[Email Error] Failed to send email via SMTP:", error.message);
            // Log fallback code so development flow is not interrupted
            console.log(`\n========================================\n[DEV 2FA OTP] For: ${email}\nOTP Code: ${otp}\n========================================\n`);
            return true;
        }
    } else {
        // Fallback for development without configured SMTP
        console.log(`\n========================================\n[DEV 2FA OTP] (SMTP credentials not in .env)\nRecipient: ${email}\nPurpose: ${purpose}\nOTP Code: ${otp}\n========================================\n`);
        return true;
    }
};
