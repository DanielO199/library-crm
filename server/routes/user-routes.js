const express = require('express');

const usersControllers = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');
const paginatedResults = require('../middleware/pagination');
const User = require('../models/user');

const router = express.Router();

//GET ALL USERS
router.get('/', paginatedResults(User), usersControllers.getAllUsers);
//GET SINGLE USER
router.get('/:uid', usersControllers.getUserById);
//ADD USER
router.post('/', fileUpload.single('image'), usersControllers.createUser);
//UPDATE USER STATUS
router.patch('/status/:uid', usersControllers.updateUserStatus);
//UPDATE USER
router.patch('/:uid', fileUpload.single('image'), usersControllers.updateUser);
//DELETE USER
router.delete('/:uid', usersControllers.deleteUser);

module.exports = router;
