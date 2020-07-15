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

	const borrowsInMonthObj = {
		Jan: 0,
		Feb: 0,
		Mar: 0,
		Apr: 0,
		May: 0,
		Jun: 0,
		Jul: 0,
		Aug: 0,
		Sep: 0,
		Oct: 0,
		Nov: 0,
		Dec: 0
	};

	const issuesDates = [];
	const monthsArr = [];

	for (const loan in loans) {
		issuesDates.push(loans[loan].issueDate);
	}

	for (const issueDate in issuesDates) {
		monthsArr.push(String(issuesDates[issueDate]).slice(4, 7));
	}

	for (const item in monthsArr) {
		switch (String(monthsArr[item])) {
			case 'Jan':
				borrowsInMonthObj.Jan += 1;
				break;
			case 'Feb':
				borrowsInMonthObj.Feb += 1;
				break;
			case 'Mar':
				borrowsInMonthObj.Mar += 1;
				break;
			case 'Apr':
				borrowsInMonthObj.Apr += 1;
				break;
			case 'May':
				borrowsInMonthObj.May += 1;
				break;
			case 'Jun':
				borrowsInMonthObj.Jun += 1;
				break;
			case 'Jul':
				borrowsInMonthObj.Jul += 1;
				break;
			case 'Aug':
				borrowsInMonthObj.Aug += 1;
				break;
			case 'Sep':
				borrowsInMonthObj.Sep += 1;
				break;
			case 'Oct':
				borrowsInMonthObj.Oct += 1;
				break;
			case 'Nov':
				borrowsInMonthObj.Nov += 1;
				break;
			case 'Dec':
				borrowsInMonthObj.Dec += 1;
				break;
		}
	}

	res.json({ borrowsInMonthObj: Object.values(borrowsInMonthObj) });
};

const getMostActiveUsers = async (req, res) => {
	let mostActiveUsers;

	try {
		mostActiveUsers = await User.find()
			.limit(5)
			.sort({ borrowedBooksQuantity: -1 });
	} catch (err) {}

	res.json({ mostActiveUsers });
};

exports.getQuantityOfDocuments = getQuantityOfDocuments;
exports.getAllLoansSortedByMonths = getAllLoansSortedByMonths;
exports.getMostActiveUsers = getMostActiveUsers;
