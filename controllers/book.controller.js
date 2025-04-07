import Book from "../models/book.model.js";
import Review from "../models/review.model.js";

export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      description,
      pdfLink,
      suggestedFor,
      isPaid,
      price,
    } = req.body;

    if (isPaid && !price) {
      return res
        .status(400)
        .json({ message: "Price must be provided if the book is paid." });
    }

    const newBook = new Book({
      title,
      author,
      category,
      description,
      pdfLink,
      suggestedFor,
      isPaid,
      price: isPaid ? price : undefined,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching book", error: error.message });
  }
};

export const updateBookById = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      description,
      pdfLink,
      suggestedFor,
      isPaid,
      price,
    } = req.body;

    if (isPaid && !price) {
      return res
        .status(400)
        .json({ message: "Price must be provided if the book is paid." });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        category,
        description,
        pdfLink,
        suggestedFor,
        isPaid,
        price: isPaid ? price : undefined,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating book", error: error.message });
  }
};

export const addReviewToBook = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const bookId = req.params.id;

    const newReview = new Review({
      userId,
      message,
    });

    await newReview.save();

    const book = await Book.findByIdAndUpdate(
      bookId,
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(201).json(newReview);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};

export const getReviewsForBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("reviews");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book.reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
};

export const updateReviewForBook = async (req, res) => {
  try {
    const { message } = req.body;
    const reviewId = req.params.reviewId;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { message },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
};

export const removeReviewFromBook = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const bookId = req.params.id;

    const book = await Book.findByIdAndUpdate(
      bookId,
      { $pull: { reviews: reviewId } },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing review", error: error.message });
  }
};
