import Book from "../models/book.model.js";

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
