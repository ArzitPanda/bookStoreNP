// routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController.js');
const multer = require('multer');

// Define storage for the uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Destination folder where uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for the uploaded image
    }
});

// Initialize multer instance with the defined storage
const upload = multer({ storage: storage });

// Create a new book
router.post('/', upload.single('image'),bookController.createBook);

// Get all books
router.get('/', bookController.getAllBooks);

// Get a single book by ID
router.get('/:id', bookController.getBookById);


// Get all books by category ID
router.get('/category/:categoryId', bookController.getBooksByCategoryId);

// Get all books by author ID
router.get('/author/:authorId', bookController.getBooksByAuthorId);

// Update a book by ID
router.put('/:id', bookController.updateBook);

// Delete a book by ID
router.delete('/:id', bookController.deleteBook);

module.exports = router;
