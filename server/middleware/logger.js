const Log = require('../models/log');

async function logger(req, res, next) {
	if (
		req.method === 'POST' ||
		req.method === 'PATCH' ||
		req.method === 'DELETE'
	) {
		let action;
		const entity = req.url.split('/')[2];

		if (req.method === 'POST') action = 'Create';
		if (req.method === 'PATCH') action = 'Update';
		if (req.method === 'DELETE') action = 'Delete';

		let createdLog = new Log({
			entity,
			action
		});

		try {
			await createdLog.save();
		} catch (err) {}
	}

	next();
}

module.exports = logger;
