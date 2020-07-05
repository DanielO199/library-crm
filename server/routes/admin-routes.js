const express = require('express');

const adminControllers = require('../controllers/admin-controllers');

const router = express.Router();

//LOGIN ADMIN
router.post('/login', adminControllers.login);
//CREATE ADMIN
router.post('/signin', adminControllers.createAdmin);

module.exports = router;
