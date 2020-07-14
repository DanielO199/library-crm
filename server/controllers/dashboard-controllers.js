const Book = require('../models/book');
const User = require('../models/user');
const Loan = require('../models/loan');

const getQuantityOfDocuments = async (req, res) => {
	let booksQuantity, usersQuantity, loansQuantity;

	try {
		booksQuantity = await Book.countDocuments({});
		usersQuantity = await User.countDocuments({});
		loansQuantity = await Loan.countDocuments({});
	} catch (err) {
		return res.status(500).json({ message: 'Could not load data' });
	}

	res.json({ booksQuantity, usersQuantity, loansQuantity });
};

const getAllLoansSortedByMonths = async (req, res) => {
	let loans;

	try {
		loans = await Loan.find();
	} catch (err) {
		return res.status(500).json({ message: 'Could not load data' });
	}

	const issuesDates = [];
	for (const loan in loans) {
		issuesDates.push(loans[loan].issueDate);
		// console.log(loans[loan].issueDate);
	}
	// console.log(issuesDates);
	// console.log(String(issuesDates[issuesDates.length - 1]).slice(3, 7));
	const monthsArr = [];
	for (const issueDate in issuesDates) {
		monthsArr.push(String(issuesDates[issueDate]).slice(3, 7));
	}

	const map = monthsArr.reduce(
		(acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
		new Map()
	);
	console.log(map.values());

	res.json(loans);
};

exports.getQuantityOfDocuments = getQuantityOfDocuments;
exports.getAllLoansSortedByMonths = getAllLoansSortedByMonths;
