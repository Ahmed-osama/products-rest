const express = require('express');
const verifyAuth = require('../middleware/auth.mw')
const upload = require('./../middleware/upload.mw')
const { getAllProducts, addNewProduct, getSingleProduct, updateProduct, deleteProduct } = require('./../controllers/product.controller')

const router = express.Router();

router.get('/', getAllProducts)

router.post('/', upload.single('productImage'), verifyAuth, addNewProduct)

router.get('/:productId', getSingleProduct)

router.patch('/:productId', verifyAuth, updateProduct)

router.delete('/:productId', verifyAuth, deleteProduct)

module.exports = router