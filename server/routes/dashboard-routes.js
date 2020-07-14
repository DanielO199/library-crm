const express = require('express');

const dashboardControllers = require('../controllers/dashboard-controllers');

const router = express.Router();

//GET QUANTITY OF ALL DOCUMENTS
router.get('/', dashboardControllers.getQuantityOfDocuments);
//GET ALL LOANS SORTED BY DATE
router.get('/loans', dashboardControllers.getAllLoansSortedByMonths);

module.exports = router;
