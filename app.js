require('dotenv').config();
const express = require('express');
const productRoutes = require('./Routes/ProductRoute');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/products', productRoutes);

const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});