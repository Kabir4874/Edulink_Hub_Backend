import jwt from "jsonwebtoken";
import Book from "../models/book.model.js";
import Professor from "../models/professor.model.js";
import University from "../models/university.model.js";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, address, phoneNumber, profilePicture } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, address, phoneNumber, profilePicture },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

export const updateUserPremiumStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { isPremium } = req.body;

    if (typeof isPremium !== "boolean") {
      return res
        .status(400)
        .json({ message: "isPremium must be a boolean value" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isPremium,
        premiumExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign(
      {
        userId: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        isPremium: updatedUser.isPremium,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json(token);
  } catch (error) {
    res.status(500).json({
      message: "Error updating user premium status",
      error: error.message,
    });
  }
};

export const purchaseBook = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!user.purchasedBooks.includes(bookId)) {
      user.purchasedBooks.push(bookId);
      await user.save();
    }

    return res.status(200).json({ message: "Book purchased successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error purchasing book", error: error.message });
  }
};

export const checkIfBookPurchased = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const user = await User.findById(userId).populate("purchasedBooks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookPurchased = user.purchasedBooks.some(
      (book) => book._id.toString() === bookId
    );

    return res.status(200).json({ isPurchased: bookPurchased });
  } catch (error) {
    return res.status(500).json({
      message: "Error checking book purchase status",
      error: error.message,
    });
  }
};

export const getAppStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalBooksPurchased = await User.aggregate([
      { $unwind: "$purchasedBooks" },
      { $group: { _id: null, totalBooks: { $sum: 1 } } },
    ]);

    const totalPremiumRevenue = await User.aggregate([
      { $match: { isPremium: true } },
      { $count: "premiumUsers" },
    ]);

    const premiumRevenue = totalPremiumRevenue.length
      ? totalPremiumRevenue[0].premiumUsers * 20
      : 0;

    const totalSellingRevenue = await User.aggregate([
      { $unwind: "$purchasedBooks" },
      {
        $lookup: {
          from: "books", // The name of the book collection
          localField: "purchasedBooks", // The field in the User collection
          foreignField: "_id", // The field in the Book collection
          as: "bookDetails", // The new field to store book details
        },
      },
      { $unwind: "$bookDetails" },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$bookDetails.price" }, // Assuming the price field exists in your Book model
        },
      },
    ]);
    const sellingRevenue = totalSellingRevenue.length
      ? totalSellingRevenue[0].totalRevenue
      : 0;

    const totalProfessors = await Professor.countDocuments();

    const totalFunding = await Book.countDocuments();

    const totalUniversities = await University.countDocuments();

    const totalBooks = await Book.countDocuments();

    return res.status(200).json({
      totalUsers,
      totalBooksPurchased: totalBooksPurchased[0]?.totalBooks || 0,
      premiumRevenue,
      sellingRevenue,
      totalProfessors,
      totalFunding,
      totalUniversities,
      totalBooks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching application statistics",
      error: error.message,
    });
  }
};
