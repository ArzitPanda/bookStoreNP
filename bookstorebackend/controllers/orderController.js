// controllers/orderController.js

const pool = require('../db.js');

// Create a new order
const createOrder = async (req, res) => {
    const { customer_id, books ,discount} = req.body; // 'books' is an array containing objects with 'book_id' and 'quantity'
    let totalPrice = 0;
    const client = await pool.connect();

    try {
        await client.query('BEGIN'); // Start transaction
        
        // Insert the order into the 'orders' table
        const orderResult = await client.query(
            'INSERT INTO orders (customer_id, total_price,payable_amount) VALUES ($1, $2 ,$3) RETURNING id',
            [customer_id, totalPrice,totalPrice]
        );
        const orderId = orderResult.rows[0].id;

        // Insert book details into the 'order_books' table
        for (const book of books) {
            const bookDetails = await client.query('SELECT price FROM books WHERE id = $1', [book.book_id]);
            if (bookDetails.rows.length === 0) {
                await client.query('ROLLBACK'); // Rollback transaction if book not found
                return res.status(404).json({ message: 'Book not found' });
            }
            const bookPrice = bookDetails.rows[0].price;
            totalPrice += bookPrice * book.quantity;

            // Insert book details into the 'order_books' table
            await client.query(
                'INSERT INTO order_books (order_id, book_id, quantity) VALUES ($1, $2, $3)',
                [orderId, book.book_id, book.quantity]
            );
        }

        // Update the 'total_price' in the 'orders' table
        await client.query('UPDATE orders SET total_price = $1 WHERE id = $2', [totalPrice, orderId]);
        await client.query('UPDATE orders SET discount = $1 WHERE id = $2', [discount, orderId]);

        await client.query('UPDATE orders SET payable_amount = $1 WHERE id = $2', [totalPrice*(1-discount), orderId]);

        await client.query('COMMIT'); // Commit transaction
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        await client.query('ROLLBACK'); // Rollback transaction if error occurs
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        client.release(); // Release client back to the pool
    }
};


// Get all orders


// Get a single order by ID
const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
        const orderBooksResult = await pool.query(
            'SELECT books.*, order_books.quantity FROM order_books INNER JOIN books ON order_books.book_id = books.id WHERE order_books.order_id = $1',
            [orderId]
        );
        const order = orderResult.rows[0];
        order.books = orderBooksResult.rows;
        res.status(200).json(order);
    } catch (error) {
        console.error('Error getting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an order by ID
const getAllOrders = async (req, res) => {
    try {
        const ordersResult = await pool.query('SELECT orders.*, customers.name AS customer_name FROM orders INNER JOIN customers ON orders.customer_id = customers.id;');
        const orders = ordersResult.rows;

        for (const order of orders) {
            const orderBooksResult = await pool.query(
                'SELECT books.*, order_books.quantity FROM order_books INNER JOIN books ON order_books.book_id = books.id  WHERE order_books.order_id = $1',
                [order.id]
            );
            order.books = orderBooksResult.rows;
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const { customer_id, books } = req.body;

    try {
        await pool.query('BEGIN'); // Start transaction

        // Update the order in the 'orders' table
        await pool.query('UPDATE orders SET customer_id = $1 WHERE id = $2', [customer_id, orderId]);

        // Delete existing order_books for the order
        await pool.query('DELETE FROM order_books WHERE order_id = $1', [orderId]);

        // Insert updated book details into the 'order_books' table
        for (const book of books) {
            await pool.query(
                'INSERT INTO order_books (order_id, book_id, quantity) VALUES ($1, $2, $3)',
                [orderId, book.book_id, book.quantity]
            );
        }

        await pool.query('COMMIT'); // Commit transaction
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error updating order:', error);
        await pool.query('ROLLBACK'); // Rollback transaction if error occurs
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.id;

    try {
        await pool.query('BEGIN'); // Start transaction

        // Delete the order from the 'orders' table
        await pool.query('DELETE FROM orders WHERE id = $1', [orderId]);

        // Delete associated order_books entries
        await pool.query('DELETE FROM order_books WHERE order_id = $1', [orderId]);

        await pool.query('COMMIT'); // Commit transaction
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        await pool.query('ROLLBACK'); // Rollback transaction if error occurs
        res.status(500).json({ message: 'Internal server error' });
    }
};



const getTopSellingBooksByMonth = async (req, res) => {
    const { month, year } = req.params;

    try {
        const topBooks = await pool.query(
            `SELECT books.*, SUM(order_books.quantity) AS total_quantity 
            FROM order_books 
            INNER JOIN orders ON order_books.order_id = orders.id 
            INNER JOIN books ON order_books.book_id = books.id 
            WHERE EXTRACT(MONTH FROM orders.orderdate) = $1 AND EXTRACT(YEAR FROM orders.orderdate) = $2
            GROUP BY books.id 
            ORDER BY total_quantity DESC 
            LIMIT 10`,
            [month, year]
        );

        res.status(200).json(topBooks.rows);
    } catch (error) {
        console.error('Error getting top selling books by month:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getBooksByCustomerId = async (req, res) => {
    const customerId = req.params.customerId;

    try {
        const customerOrders = await pool.query(
            `SELECT books.*, order_books.quantity 
            FROM order_books 
            INNER JOIN orders ON order_books.order_id = orders.id 
            INNER JOIN books ON order_books.book_id = books.id 
            WHERE orders.customer_id = $1`,
            [customerId]
        );

        res.status(200).json(customerOrders.rows);
    } catch (error) {
        console.error('Error getting books by customer ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Get books ordered by year
const getSalesByYear = async (req, res) => {
    const { year } = req.params;

    try {
        const salesByYear = await pool.query(
            `SELECT EXTRACT(MONTH FROM orders.orderdate) AS month, 
                    SUM(orders.total_price) AS total_sales 
            FROM orders 
            WHERE EXTRACT(YEAR FROM orders.orderdate) = $1
            GROUP BY EXTRACT(MONTH FROM orders.orderdate)
            ORDER BY EXTRACT(MONTH FROM orders.orderdate)`,
            [year]
        );

        res.status(200).json(salesByYear.rows);
    } catch (error) {
        console.error('Error getting sales by year:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getTopSellingBooksByMonth,
    getBooksByYear:getSalesByYear,
    getBooksByCustomerId
};
