const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	status: { type: String, required: true },
	isbn: { type: String, required: true },
	image: { type: String, required: true },
	loansQuantity: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);
