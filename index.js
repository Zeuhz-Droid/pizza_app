const express = require('express');
const passport = require('passport');
const path = require('path');
const expressSession = require('express-session');
const orderRouter = require('./routes/orderRoutes');
const authRouter = require('./routes/authRoutes');
const orderController = require('./controllers/orderController');

require('dotenv').config();
require('./config/database')();
require('./utilities/jwt-authenticate');

const PORT = process.env.PORT || '3000';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

if (app.get('env') === 'production') {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

app.use(expressSession(session));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/', authRouter);
app.use(
  '/orders',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  orderRouter
);
// app.use('/users', userRouter);
app.get('/', (req, res) => {
  res.send('welcome to orders API');
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
});

app.listen(PORT, () => {
  console.log('Listening on port, ', PORT);
});

module.exports = app;
