const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	status: { type: String, required: true },
	isbn: { type: String, required: true },
	image: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookSchema);
