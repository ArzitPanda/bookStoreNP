// controllers/bookController.js

const pool = require('../db.js');
const path = require('path');
// Create a new book
const createBook = async (req, res) => {
    const { title, author_id, category_id, price } = req.body;

    const path_upload = path.join(__dirname, '../uploads');
    console.log(path_upload)
    console.log(req.originalname)
    const img_url = req.file ? `http://localhost:3000/images/`+req.file.originalname : null; // Get the path of the uploaded image

    try {
        const newBook = await pool.query(
            'INSERT INTO books (title, author_id, category_id, price, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author_id, category_id, price, img_url]
        );
        res.status(201).json(newBook.rows[0]);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await pool.query('SELECT books.id as id,title,img_url,price,authors.id as author_id ,categories.name as category_name FROM books inner join categories on categories.id=books.category_id inner join authors on authors.id=books.author_id ');
        res.status(200).json(books.rows);
    } catch (error) {
        console.error('Error getting books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single book by ID
const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        if (book.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book.rows[0]);
    } catch (error) {
        console.error('Error getting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a book by ID
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author_id, category_id, price, img_url } = req.body;
    try {
        const updatedBook = await pool.query(
            'UPDATE books SET title = $1, author_id = $2, category_id = $3, price = $4, img_url = $5 WHERE id = $6 RETURNING *',
            [title, author_id, category_id, price, img_url, id]
        );
        if (updatedBook.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook.rows[0]);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        if (deletedBook.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getBooksByCategoryId = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const books = await pool.query('SELECT * FROM books WHERE category_id = $1', [categoryId]);
        res.status(200).json(books.rows);
    } catch (error) {
        console.error('Error getting books by category ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all books by author ID
const getBooksByAuthorId = async (req, res) => {
    const authorId = req.params.authorId;
    try {
        const books = await pool.query('SELECT * FROM books WHERE author_id = $1', [authorId]);
        res.status(200).json(books.rows);
    } catch (error) {
        console.error('Error getting books by author ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    getBooksByCategoryId,
    getBooksByAuthorId
};
