// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');

// Create a new order
router.post('/', orderController.createOrder);

// Get all orders
router.get('/', orderController.getAllOrders);

// Get a single order by ID
router.get('/:id', orderController.getOrderById);

// Update an order by ID
router.put('/:id', orderController.updateOrder);

// Delete an order by ID
router.delete('/:id', orderController.deleteOrder);


router.get('/booksByCustomerId/:customerId', orderController.getBooksByCustomerId);
router.get('/booksByYear/:year', orderController.getBooksByYear);
router.get('/topSellingBooksByMonth/:month', orderController.getTopSellingBooksByMonth);

module.exports = router;
