const express = require('express');
const { verifyAuth } = require('./../middleware/check-auth')
const Order = require('./../models/order');
const Product = require('./../models/product');
const { createOrder } = require('../utils/order.utils')

const {
    onSucess,
    onError
} = require('./../utils/server.utils')

const router = express.Router();

router.get('/', verifyAuth, (req, response, next) => {
    Order
        .find()
        .exec()
        .then(result => {
            const MappedResult = {
                request: {
                    method: "POST",
                    url: `${req.get('host')}${req.baseUrl}`,
                    body: {
                        productId: "String",
                        quantity: "Number",
                    }
                },
                length: result.length,
                orders: result.map(({ _id, product, quantity }) => ({
                    _id, product, quantity,
                    request: {
                        method: "GET",
                        url: `${req.get('host')}${req.baseUrl}/${_id}`
                    }
                }))
            }
            onSucess(response, MappedResult)
        })
        .catch(error => onError(response, error))
})

router.post('/', verifyAuth, (req, response, next) => {
    Product
        .findById(req.body.productId)

        .then(product => {
            if (!product) {
                throw {
                    message: `can't find product of id: ${req.body.productId}`,
                    status: 404
                }
            }
            const order = createOrder(req.body)
            return order.save()
        })
        .then(({ _id }) => {
            const mappedResult = {
                message: 'order created sucessfully!',
                request: [{
                    method: "PATCH",
                    url: `${req.get('host')}${req.baseUrl}/${_id}`,
                    body: {
                        productId: "String",
                        quantity: "Number",
                    }
                }, {
                    method: "GET",
                    url: `${req.get('host')}${req.baseUrl}/${_id}`,

                }]
            }
            onSucess(response, mappedResult)
        })
        .catch(error => onError(response, error, error.status))

})

router.get('/:orderId', verifyAuth, (req, response, next) => {
    const orderId = req.params.orderId
    Order
        .findById(orderId)
        .select('_id product quantity')
        .populate('product', 'name price')
        .exec()
        .then(result => {
            if (!result) {
                throw { message: 'can\'t find order of id:' + orderId, status: 404 }
            }
            onSucess(response, result)
        })
        .catch(error => onError(response, error, error.status))
})

router.patch('/:orderId', verifyAuth, (req, response, next) => {
    const _id = req.params.orderId
    Order
        .updateOne({ _id }, {
            $set: req.body
        })
        .then(() => {
            const mappedResult = {
                message: 'order has been updated!',
                request: {
                    method: "GET",
                    url: `${req.get('host')}${req.baseUrl}/${_id}`,
                }
            }
            onSucess(response, mappedResult)
        })
        .catch(error => onError(response, error))
})

router.delete('/:orderId', verifyAuth, (req, response, next) => {
    const _id = req.params.orderId
    Order
        .deleteOne({ _id })
        .then(() => {
            const mappedResult = {
                message: 'order has been deleted!',
                request: [
                    {
                        method: "POST",
                        url: `${req.get('host')}${req.baseUrl}`,
                        body: {
                            productId: "String",
                            quantity: "String",
                        }
                    },
                    {
                        method: "GET",
                        url: `${req.get('host')}${req.baseUrl}`,

                    },

                ]
            }
            onSucess(response, mappedResult)
        })
        .catch(error => onError(response, error))
})

module.exports = router