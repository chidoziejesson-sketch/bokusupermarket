const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const app = express();
const productRoute = require('./Routes/ProductRoute');

// Load environment variables from .env file
dotenv.config();
connectDB(); // Connect to MongoDB

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/products', productRoute); // Use product routes for /products endpoint

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});