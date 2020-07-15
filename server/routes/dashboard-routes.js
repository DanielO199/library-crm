const express = require('express');

const dashboardControllers = require('../controllers/dashboard-controllers');

const router = express.Router();

//GET QUANTITY OF ALL DOCUMENTS
router.get('/quantity', dashboardControllers.getQuantityOfDocuments);
//GET ALL LOANS SORTED BY DATE
router.get('/loans', dashboardControllers.getAllLoansSortedByMonths);
//GET MOST ACTIVE USERS
router.get('/users', dashboardControllers.getMostActiveUsers);

module.exports = router;
