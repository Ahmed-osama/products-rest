const express = require('express');
const { createProduct } = require('./../utils/product.utils')
const Product = require('./../models/product');
const {
    onSucess,
    onError
} = require('./../utils/server.utils');
const router = express.Router();
router.get('/', (req, response, next) => {
    Product
        .find()
        .exec()
        .then(result => onSucess(response, result))
        .catch(error => onError(response, error))

})

router.post('/', (req, response, next) => {
    const product = createProduct(req.body)
    product.save().then(
        result => onSucess(response, result)
    ).catch(error => onError(response, error))

})

router.get('/:productId', (req, response, next) => {
    const productId = req.params.productId
    Product.findById(productId).exec().then(
        result => {
            if (!result) {
                response.status(404).json({
                    message: 'not found product with the this id :' + productId
                })
            }
            onSucess(response, result)
        }
    ).catch(error => {
        onError(response, error)
    })

})

router.patch('/:productId', (req, response, next) => {
    const _id = req.params.productId
    const body = req.body
    Product
        .updateOne({ _id }, {
            $set: body

        })
        .exec()
        .then(result => onSucess(response, result))
        .catch(error => onError(response, error))
})

router.delete('/:productId', (req, response, next) => {
    const _id = req.params.productId

    Product
        .deleteOne({ _id })
        .exec()
        .then(result => onSucess(response, result))
        .catch(error => onError(response, error))
})

module.exports = router