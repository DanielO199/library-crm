const express = require('express');

const dashboardControllers = require('../controllers/dashboard-controllers');
const paginatedResults = require('../middleware/pagination');
const Log = require('../models/log');

const router = express.Router();

//GET QUANTITY OF ALL DOCUMENTS
router.get('/quantity', dashboardControllers.getQuantityOfDocuments);
//GET ALL LOANS SORTED BY DATE
router.get('/loans', dashboardControllers.getAllLoansSortedByMonths);
//GET AUDIT LOGS
router.get('/logs', paginatedResults(Log), dashboardControllers.getAuditLogs);
//GET MOST ACTIVE USERS AND BEST BOOKS
router.get('/', dashboardControllers.getMostActiveUsersAndBooks);

module.exports = router;
