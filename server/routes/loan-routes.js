const express = require('express');

const loansControllers = require('../controllers/loans.controllers');
const paginatedResults = require('../middleware/pagination');
const Loan = require('../models/loan');

const router = express.Router();

//GET ALL LOANS
router.get('/', paginatedResults(Loan), loansControllers.getAllLoans);
//GET SINGLE LOAN
router.get('/:lid', loansControllers.getLoanById);
//ADD LOAN
router.post('/', loansControllers.createLoan);
//UPDATE LOAN
// router.patch('/:lid', loansControllers.updateUser);
//DELETE LOAN
// router.delete('/:lid', loansControllers.deleteUser);

module.exports = router;
