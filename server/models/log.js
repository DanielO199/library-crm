const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
	entity: { type: String, required: true },
	action: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
