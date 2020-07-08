function paginatedResults(model) {
	return async (req, res, next) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const queries = [];

		for (const query in Object.entries(req.query)) {
			if (
				Object.entries(req.query)[query][0] === 'page' ||
				Object.entries(req.query)[query][0] === 'limit'
			)
				continue;
			queries.push({
				[Object.entries(req.query)[query][0]]: {
					$regex: `.*${Object.entries(req.query)[query][1]}.*`
				}
			});
		}

		let queriesObj;
		if (queries.length !== 0) {
			queriesObj = {
				$and: queries
			};
		} else {
			queriesObj = {};
		}

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const results = {};
		const resultsQuantity = await model.find(queriesObj).exec();

		results.length = resultsQuantity.length;

		if (endIndex < results.length) {
			results.next = {
				page: page + 1,
				limit: limit
			};
		}

		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit: limit
			};
		}

		try {
			resultsList = await model
				.find(queriesObj)
				.limit(limit)
				.skip(startIndex)
				.sort({ _id: -1 })
				.exec();

			results.results = resultsList.map((result) =>
				result.toObject({ getters: true })
			);
			res.paginatedResults = results;

			next();
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	};
}

module.exports = paginatedResults;
