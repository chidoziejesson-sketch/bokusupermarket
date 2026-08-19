const express = require('express');

//import authentication middleware
const { protect } = require('../Middleware/auth');

const router = express.Router(); // create a router instance

// import the product controller
const productController = require('../Controllers/ProductController');

// define routes for product operations
router.post('/createproducts', protect, productController.createProduct);

router.put('/updateproducts/:id', protect, productController.updateProduct);

router.get('/getproducts/:id', protect, productController.getProductById);

router.get('/getAllproducts', protect, productController.getAllProducts);

router.delete('/deleteproducts/:id', protect, productController.deleteProduct);    

// export the router
module.exports = router;

