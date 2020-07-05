const express = require('express');

const booksControllers = require('../controllers/books-controllers');
const fileUpload = require('../middleware/file-upload');
const paginatedResults = require('../middleware/pagination');
const Book = require('../models/book');

const router = express.Router();

//GET ALL BOOKS
router.get('/', paginatedResults(Book), booksControllers.getAllBooks);
//GET SINGLE BOOK
router.get('/:bid', booksControllers.getBookById);
//ADD BOOK
router.post('/', fileUpload.single('image'), booksControllers.createBook);
//UPDATE BOOK
router.patch('/:bid', fileUpload.single('image'), booksControllers.updateBook);
//DELETE BOOK
router.delete('/:bid', booksControllers.deleteBook);

module.exports = router;
