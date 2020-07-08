// const { validationResult } = require('express-validator');
const User = require('../models/user');
const Book = require('../models/book');
const Loan = require('../models/loan');

const getAllLoans = async (req, res) => {
	res.json(res.paginatedResults);
};

const getLoanById = async (req, res, next) => {
	const loanId = req.params.lid;

	let loan;
	try {
		loan = await Loan.findById(loanId);
	} catch (err) {
		res.status(500).json({ message: 'Could not find loan' });
	}

	res.json({ loan: loan.toObject({ getters: true }) });
};

const createLoan = async (req, res) => {
	const { selectedBook, selectedUser, selectedDate } = req.body;

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

	const createdLoan = new Loan({
		issueDate: selectedDate,
		book,
		user,
		status: 'In progress'
	});

	try {
		await createdLoan.save();
	} catch (err) {
		return res.status(500).json({ message: 'Could not save loan' });
	}

	return res.status(201).json({ message: 'Loan created' });
};

const updateLoan = async (req, res) => {
	const { returnDate } = req.body;
	const loanId = req.params.lid;

	let loan;
	try {
		loan = await Loan.findById(loanId);
	} catch (err) {
		return res.status(500).json({ message: 'Could not find loan' });
	}

	console.log(loan);
	//todo remember to update book aswell make it available again

	// let book
	// try{
	//   book = await Book.findById()
	// }catch(err) {
	// 	return res.status(500).json({ message: 'Could not find book' });
	// }

	loan.returnDate = returnDate;
	loan.status = 'Closed';

	try {
		await loan.save();
	} catch (err) {
		return res.status(500).json({ message: 'Could not update loan' });
	}

	res.status(200).json({ message: 'Loan updated succesfully' });
};

const deleteLoan = () => {};

exports.getAllLoans = getAllLoans;
exports.getLoanById = getLoanById;
exports.createLoan = createLoan;
exports.updateLoan = updateLoan;
exports.deleteLoan = deleteLoan;
