const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	phone: { type: String, required: true },
	status: { type: String, required: true },
	email: { type: String, required: true },
	image: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
