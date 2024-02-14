// controllers/customerController.js

const pool = require('../db.js');

// Create a new customer
const createCustomer = async (req, res) => {
    const { name, email, address, phone_number } = req.body;
    try {
        const newCustomer = await pool.query(
            'INSERT INTO customers (name, email, address, phone_number) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, address, phone_number]
        );
        res.status(201).json(newCustomer.rows[0]);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await pool.query('SELECT * FROM customers');
        res.status(200).json(customers.rows);
    } catch (error) {
        console.error('Error getting customers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single customer by ID
const getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
        if (customer.rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer.rows[0]);
    } catch (error) {
        console.error('Error getting customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a customer by ID
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, email, address, phone_number } = req.body;
    try {
        const updatedCustomer = await pool.query(
            'UPDATE customers SET name = $1, email = $2, address = $3, phone_number = $4 WHERE id = $5 RETURNING *',
            [name, email, address, phone_number, id]
        );
        if (updatedCustomer.rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(updatedCustomer.rows[0]);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a customer by ID
const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCustomer = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
        if (deletedCustomer.rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
