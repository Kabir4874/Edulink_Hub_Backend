import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      if (!userExists.emailVerified) {
        await User.deleteOne({ email });
      } else {
        return res
          .status(400)
          .json({ message: "User already exists and is verified" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      emailVerified: false,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error on register user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.emailVerified) {
      return res.status(400).json({ message: "Please verify your email" });
    }

    const currentDate = new Date();
    const isPremium = user.isPremium && user.premiumExpiresAt > currentDate;

    if (!isPremium) {
      user.isPremium = false;
      user.premiumExpiresAt = null;
      await user.save();
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error on login user" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does not exist" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password has been successfully reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
        name: admin.name,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login successfully",
      token,
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error on login admin" });
  }
};
