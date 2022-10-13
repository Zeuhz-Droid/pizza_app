const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');

// CRUD

orderRouter
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

orderRouter
  .route('/:id')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = orderRouter;
