const express = require('express');
const router = express.Router();
const pool = require('../db.js'); // Import your database connection pool

// GET endpoint to retrieve category-wise sales data with optional year and month filters
router.get('/category-sales', async (req, res) => {
    try {
        // Extract year and month from query parameters
        const { year, month } = req.query;

        // Construct the base query
        let query = `
            SELECT categories.name, SUM(order_books.quantity) AS total_quantity
            FROM order_books
            INNER JOIN orders ON orders.id = order_books.order_id
            INNER JOIN books ON books.id = order_books.book_id
            INNER JOIN categories ON categories.id = books.category_id
        `;

        // Add conditions for year and month if provided
        const conditions = [];
        if (year) {
            conditions.push(`EXTRACT(YEAR FROM orders.orderdate) = ${year}`);
        }
        if (month) {
            conditions.push(`EXTRACT(MONTH FROM orders.orderdate) = ${month}`);
        }
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        // Group by category name
        query += ' GROUP BY categories.name';

        // Execute the query
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving category-wise sales:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/popular-books', async (req, res) => {
    try {

        let mylimit =5
        const { year, month, limit } = req.query;
        if(limit !== undefined)
        {mylimit=limit
           
        }
        // Define the base SQL query
        let sql = `
            SELECT b.id, b.title, b.price,
                   SUM(ob.quantity) AS total_quantity_ordered
            FROM books b
            
            JOIN order_books ob ON b.id = ob.book_id
            INNER JOIN orders ON orders.id = ob.order_id
        `;
        
        // Add optional filters for year and month
        if (year && month) {
            sql += `WHERE EXTRACT(YEAR FROM orders.orderdate) = ${year} AND EXTRACT(MONTH FROM orders.orderdate) = ${month}`;
        } else if (year) {
            sql += `WHERE EXTRACT(YEAR FROM orders.orderdate) =  ${year}`;
        } else if (month) {
            sql += `WHERE EXTRACT(MONTH FROM orders.orderdate) =  ${month}`;
        }
        
        // Add GROUP BY, ORDER BY, and LIMIT clauses
        sql += `
            GROUP BY b.id
            ORDER BY total_quantity_ordered DESC
            LIMIT ${mylimit}
        `;
        
        
        
        const { rows } = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching popular books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/total-payable-by-date', async (req, res) => {
    try {
        const query = `
            SELECT SUM(payable_amount) AS total_payable_amount, DATE(orderdate) AS date
            FROM orders
            GROUP BY DATE(orderdate)
        `;
        
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching total payable amount by date:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/most-loved-authors', async (req, res) => {
    try {
        const query = `
            SELECT a.name AS author_name, SUM(ob.quantity) AS total_quantity_sold
            FROM books b
            JOIN authors a ON b.author_id = a.id
            JOIN order_books ob ON b.id = ob.book_id
            GROUP BY a.id, a.name
            ORDER BY total_quantity_sold DESC
        `;
        
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching most loved authors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
