// const { validationResult } = require('express-validator');
const User = require('../models/user');
const Book = require('../models/book');
const Loan = require('../models/loan');

const getAllLoans = async (req, res) => {
	res.json(res.paginatedResults);

	console.log(res.paginatedResults);
};

const getLoanById = async (req, res, next) => {};

const createLoan = async (req, res) => {
	const { selectedBook, selectedUser, selectedDate } = req.body;
	// console.log(selectedBook, selectedUser, selectedDate);
	let user;
	try {
		user = await User.findById(selectedUser.value);
	} catch (err) {
		return res.status(500).json({ message: 'Could not find user' });
	}

	if (!user) {
		return res.status(404).json({ message: 'Could not find user' });
	}

	let book;
	try {
		book = await Book.findById(selectedBook.value);
	} catch (err) {
		return res.status(500).json({ message: 'Could not find book' });
	}

	if (!book) {
		return res.status(404).json({ message: 'Could not find book' });
	}

	book.status = 'Unavailable';

	try {
		await book.save();
	} catch (err) {
		return res.status(500).json({ message: 'Could not save loan' });
	}

	console.log(book, user);

	const createdLoan = new Loan({
		issueDate: selectedDate,
		book: book,
		user: user,
		status: 'In progress'
	});

	try {
		await createdLoan.save();
	} catch (err) {
		return res.status(500).json({ message: 'Could not save loan' });
	}

	console.log(createdLoan);

	return res.status(201).json({ message: 'Loan created' });
};
// const updateProduct = () => {};
// const deleteProduct = () => {};

exports.getAllLoans = getAllLoans;
exports.getLoanById = getLoanById;
exports.createLoan = createLoan;
// exports.updateProduct = updateProduct;
// exports.deleteProduct = deleteProduct;
