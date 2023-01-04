const express = require('express');
const { createCart, showProducts, addProduct }  = require('../utils/CartManager');


const router = express.Router();

// Example: http://localhost:8080/api/carts
router.post('/', createCart); 
// Example: http://localhost:8080/api/carts/8
router.get('/:cid', showProducts);
//Example: http://localhost:8080/api/carts/8/product/7
router.post('/:cid/product/:pid', addProduct);

module.exports = router;