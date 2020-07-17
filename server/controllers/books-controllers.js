const fs = require('fs');
const Book = require('../models/book');

const getAllBooks = async (req, res) => {
	res.json(res.paginatedResults);
};

const getBookById = async (req, res) => {
	const bookId = req.params.bid;

	let book;
	try {
		book = await Book.findById(bookId);
	} catch (err) {
		res.status(500).json({ message: 'Could not find book' });
	}

	res.json({ book: book.toObject({ getters: true }) });
};

const createBook = async (req, res) => {
	const { isbn, title, author } = req.body;

	let existingBook;
	try {
		existingBook = await Book.findOne({ isbn });
	} catch (err) {
		return res.status(500).json({ message: 'Adding new book failed' });
	}

	if (existingBook) {
		return res.status(409).json({ message: 'Book already exists' });
	}

	let createdBook = new Book({
		isbn,
		title,
		author,
		image: req.file.path,
		status: 'Available',
		loansQuantity: 0
	});

	try {
		await createdBook.save();
	} catch (err) {
		return res.status(500).json({ message: 'Signing up failed' });
	}

	res.status(201).json({
		message: 'Book added succesfully',
		createdBook
	});
};

const updateBook = async (req, res) => {
	const { isbn, author, title } = req.body;

	const bookId = req.params.bid;

	let updatedBook;
	try {
		updatedBook = await Book.findById(bookId);
	} catch (err) {
		return res.status(500).json({ message: 'Could not find book' });
	}

	updatedBook.isbn = isbn;
	updatedBook.author = author;
	updatedBook.title = title;

	if (req.file) {
		fs.unlink(updatedBook.image, (err) => {
			console.log(err);
		});
		updatedBook.image = req.file.path;
	}

	try {
		await updatedBook.save();
	} catch (err) {
		return res.status(500).json({ message: 'Could not update book' });
	}

	res.status(200).json({ message: 'Book updated succesfully' });
};

const deleteBook = async (req, res) => {
	const bookId = req.params.bid;

	let book;
	try {
		book = await Book.findById(bookId);
	} catch (err) {
		return res.status(500).json({ message: 'Could not delete book' });
	}

	if (!book) {
		return res.status(404).json({ message: 'Could not find book' });
	}

	if (book.status === 'Unavailable') {
		return res.status(200).json({
			message:
				"This book can't be deleted because it's related to one or more loans."
		});
	}

	try {
		await Book.deleteOne({ _id: bookId });
	} catch (err) {
		return res.status(500).json({ message: 'Could not delete book.' });
	}

	fs.unlink(book.image, (err) => {
		console.log(err);
	});

	res.status(200).json({ message: 'Book deleted' });
};

exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
