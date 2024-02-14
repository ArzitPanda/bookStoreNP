// controllers/categoryController.js

const pool = require('../db.js');

// Create a new category
const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(newCategory.rows[0]);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await pool.query('SELECT * FROM categories');
        res.status(200).json(categories.rows);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
        if (category.rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category.rows[0]);
    } catch (error) {
        console.error('Error getting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a category by ID
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedCategory = await pool.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        if (updatedCategory.rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory.rows[0]);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
        if (deletedCategory.rows.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
