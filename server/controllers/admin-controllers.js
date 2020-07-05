const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Admin = require('../models/admin');

const login = async (req, res) => {
	const { email, password } = req.body;

	let existingAdmin;
	try {
		existingAdmin = await Admin.findOne({ email });
	} catch (err) {
		return res.status(500).json({ message: 'Login up failed' });
	}

	if (!existingAdmin) {
		return res.status(401).json({ message: 'Invalid login or password' });
	}

	let isValidPassword = await bcrypt.compare(password, existingAdmin.password);

	if (!isValidPassword) {
		return res.status(401).json({ message: 'Invalid data, please try again' });
	}

	let token = jwt.sign(
		{ userId: existingAdmin.id, email: existingAdmin.email },
		'SECRET_KEY',
		{ expiresIn: '1h' }
	);

	return res.json({
		adminId: existingAdmin.id,
		email: existingAdmin.email,
		token: token
	});
};

const createAdmin = async (req, res) => {
	const { email, password } = req.body;

	let existingAdmin;
	try {
		existingAdmin = await Admin.findOne({ email: email });
	} catch (err) {
		return res.status(500).json({ message: 'Signin up failed' });
	}

	if (existingAdmin) {
		return res.status(422).json({ message: 'Email is already used' });
	}

	let hashedPassword = await bcrypt.hash(password, 12);

	const createdAdmin = new Admin({
		email,
		password: hashedPassword
	});

	try {
		await createdAdmin.save();
	} catch (err) {
		return res.status(500).json({ message: 'Signing up failed' });
	}
	return res.status(201).json({ message: 'Admin created succesfully' });
};

exports.login = login;
exports.createAdmin = createAdmin;
