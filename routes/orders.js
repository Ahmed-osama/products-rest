const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "get all orders"
    })
})

router.post('/', (req, res, next) => {
    const order = {
        product: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "post order to orders",
        order
    })
})

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    res.status(200).json({
        message: "get order by id",
        orderId
    })
})

router.patch('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    res.status(200).json({
        message: "patch order by id",
        orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    res.status(200).json({
        message: "delete order by id",
        orderId
    })
})

module.exports = router