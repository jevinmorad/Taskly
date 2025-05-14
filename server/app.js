const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const passport = require('passport');

// Load env vars
dotenv.config()

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
<<<<<<< HEAD
app.use(cookieParser());
app.use(passport.initialize());

// Register Google strategy before routes
require('./config/passport');
=======
app.use(cookieParser)
>>>>>>> 2b500f063109840196c4165f4ed4d5271b11daa4

// Route files
const authRoutes = require('./routes/auth.route.js');
const todoRoutes = require('./routes/todo.route.js');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Error handling middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
app.use(notFound);
app.use(errorHandler);

module.exports = app;