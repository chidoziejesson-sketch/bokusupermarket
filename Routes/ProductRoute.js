const express = require('express');

//import authentication middleware
const { protect } = require('../Middleware/auth');

//import authorization middleware
const { authorize } = require('../Middleware/role');

const router = express.Router(); // create a router instance

// import the product controller
const productController = require('../Controllers/ProductController');

// define routes for product operations
router.post('/createproducts', protect, authorize('superadmin'), productController.createProduct);

router.put('/updateproducts/:id', protect, authorize('superadmin'), productController.updateProduct);

router.get('/getproducts/:id', protect, productController.getProductById);

router.get('/getAllproducts', protect, productController.getAllProducts);

router.delete('/deleteproducts/:id', protect, authorize('superadmin'), productController.deleteProduct);    

// export the router
module.exports = router;

