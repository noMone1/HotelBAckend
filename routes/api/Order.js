const express = require('express');
const router = express.Router();
const orderController = require('../../controller/Orders/index');

// Routes
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/cancel/:id', orderController.cancelOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deletedOrder);

module.exports = router;