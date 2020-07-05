const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

//GET ALL USERS
router.get('/', usersControllers.getAllUsers);
//GET SINGLE USER
router.get('/:lid', usersControllers.getUserById);
//ADD USER
router.post('/', usersControllers.createUser);
//UPDATE USER
router.patch('/:lid', usersControllers.updateUser);
//DELETE USER
router.delete('/:lid', usersControllers.deleteUser);

module.exports = router;
