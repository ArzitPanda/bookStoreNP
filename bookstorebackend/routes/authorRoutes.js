// routes/authorRoutes.js

const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController.js');

// Create a new author
router.post('/', authorController.createAuthor);

// Get all authors
router.get('/', authorController.getAllAuthors);

// Get a single author by ID
router.get('/:id', authorController.getAuthorById);

// Update an author by ID
router.put('/:id', authorController.updateAuthor);

// Delete an author by ID
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
