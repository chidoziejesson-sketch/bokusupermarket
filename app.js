const express = require('express');
const productRoutes = require('./Routes/ProductRoute');
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/products', productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});