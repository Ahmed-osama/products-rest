const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "get all products"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "post product to products"
    })
})

router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId
    res.status(200).json({
        message: "get product by id",
        productId
    })
})

router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId
    res.status(200).json({
        message: "patch product by id",
        productId
    })
})

router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId
    res.status(200).json({
        message: "delete product by id",
        productId
    })
})

module.exports = router