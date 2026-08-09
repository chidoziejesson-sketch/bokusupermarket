const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const app = express();
const productRoutes = require('./Routes/ProductRoute');

// Load environment variables from .env file
dotenv.config();
connectDB(); // Connect to MongoDB

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/products', productRoutes); // Use product routes for /products endpoint

const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});