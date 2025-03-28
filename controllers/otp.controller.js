import dotenv from "dotenv";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  service: process.env.SMTP_SERVICE,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take messages");
  }
});
const generateRandomCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

//Send Email OTP
export const sendEmailOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const emailVerificationCode = generateRandomCode();
    user.emailVerificationCode = emailVerificationCode;
    await user.save();

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: user.email,
      subject: "Verification Code",
      text: `Your verification code is: ${emailVerificationCode}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Email verification code sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Verify Email OTP
export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || String(user.emailVerificationCode) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.emailVerified = true;
    user.emailVerificationCode = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
