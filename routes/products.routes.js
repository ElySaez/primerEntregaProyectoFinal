const express = require('express');
const { getProducts, getProductId, saveProduct, updateProduct, deleteProduct }  = require('../utils/ProductManager');

const router = express.Router();

// Example : http://localhost:8080/api/products 
router.get('/', getProducts);

//Example : http://localhost:8080/api/products/4
router.get('/:pid', getProductId);

//Example : http://localhost:8080/api/products 
router.post('/', saveProduct);

//Example : http://localhost:8080/api/products/6   Se debe actualizar junto a todos los campos enviados desde body
router.put('/:pid', updateProduct);

//Example : http://localhost:8080/api/products/7
router.delete('/:pid', deleteProduct);

module.exports = router;