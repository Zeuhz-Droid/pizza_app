const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('auth0', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
  orderController.getAllOrders
);

router.post('/signup', userController.createUser);

module.exports = router;
