const express = require('express');
const router = express.Router(); // create a router instance

// import the product controller
const productController = require('../Controllers/ProductController');

// define routes for product operations
router.post('/createproducts', productController.createProduct);

router.put('/updateproducts/:id', productController.updateProduct);

router.get('/getproducts/:id', productController.getProductById);

router.get('/getAllproducts', productController.getAllProducts);

router.delete('/deleteproducts/:id', productController.deleteProduct);    

// export the router
module.exports = router;

