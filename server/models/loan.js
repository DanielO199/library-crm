const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loanSchema = new Schema({
	issueDate: { type: Date, required: true },
	returnDate: { type: Date, required: false },
	createdAt: { type: Date, default: Date.now },
	status: { type: String, required: true },
	book: { type: Object, required: true, ref: 'Book' },
	user: { type: Object, required: true, ref: 'User' }
});

module.exports = mongoose.model('Loan', loanSchema);
