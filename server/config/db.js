const mongoose = require('mongoose');
require('dotenv').config();

module.exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected');
    }
    catch (err) {
        console.error('ERROR:',err.message);
        process.exit(1);
    }
}