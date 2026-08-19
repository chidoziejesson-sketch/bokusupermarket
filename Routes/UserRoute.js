const express = require('express');
const router = express.Router();

// import the user controller
const userController = require('../Controllers/UserController');

// define the routes
router.post('/createuser', userController.createUser);
router.post('/loginuser', userController.loginUser);
router.get('/getuser/:id', userController.getUserById);
router.get('/getAllusers', userController.getAllUsers);
router.put('/updateuser/:id', userController.updateUser);
router.delete('/deleteuser/:id', userController.deleteUser);

module.exports = router;