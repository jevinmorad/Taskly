const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config()

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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