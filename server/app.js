const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin-routes');
const usersRoutes = require('./routes/user-routes');
const booksRoutes = require('./routes/book-routes');
const loansRoutes = require('./routes/loan-routes');
const dashboardRoutes = require('./routes/dashboard-routes');

const server = express();

server.use(bodyParser.json());

server.use('/uploads/images', express.static(path.join('uploads', 'images')));

server.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');

	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

	next();
});

server.use('/api/admin', adminRoutes);
server.use('/api/users', usersRoutes);
server.use('/api/books', booksRoutes);
server.use('/api/loans', loansRoutes);
server.use('/api/dashboard', dashboardRoutes);

server.use(() => {
	throw new Error('Could not find this route');
});

server.use((error, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, () => {
			console.log(error);
		});
	}
	if (res.headerSent) {
		return next(error);
	}
	res
		.status(error.code || 500)
		.json({ message: error.message || 'An uknown error occurred' });
});

mongoose
	.connect(
		'mongodb+srv://Bananq199:vvuaplPpz70ao31V@cluster0-fm9cw.mongodb.net/crm-library-db?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(server.listen(5000))
	.catch((err) => {
		console.log(err);
	});
