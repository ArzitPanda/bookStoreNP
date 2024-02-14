// controllers/authorController.js

const pool = require('../db.js');

// Create a new author
const createAuthor = async (req, res) => {
    const { name, biography } = req.body;
    try {
        const newAuthor = await pool.query(
            'INSERT INTO authors (name, biography) VALUES ($1, $2) RETURNING *',
            [name, biography]
        );
        res.status(201).json(newAuthor.rows[0]);
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await pool.query('SELECT * FROM authors');
        res.status(200).json(authors.rows);
    } catch (error) {
        console.error('Error getting authors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single author by ID
const getAuthorById = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
        if (author.rows.length === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json(author.rows[0]);
    } catch (error) {
        console.error('Error getting author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an author by ID
const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, biography } = req.body;
    try {
        const updatedAuthor = await pool.query(
            'UPDATE authors SET name = $1, biography = $2 WHERE id = $3 RETURNING *',
            [name, biography, id]
        );
        if (updatedAuthor.rows.length === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json(updatedAuthor.rows[0]);
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an author by ID
const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAuthor = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
        if (deletedAuthor.rows.length === 0) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};
