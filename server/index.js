const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})