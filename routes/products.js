const express = require('express');
const { createProduct } = require('./../utils/product.utils')
const multer = require('multer')
const Product = require('./../models/product');
const {
    onSucess,
    onError
} = require('./../utils/server.utils')

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${new Date().toISOString()}-${file.originalname}`)
    },
})
const fileFilter = (req, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('invalid file type'), false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,

    },
    fileFilter
})
router.get('/', (req, response, next) => {
    Product
        .find()
        .select('name price _id productImage')
        .exec()
        .then(result => {
            const products = result.map(({ name, price, _id, productImage }) => {
                return {
                    name,
                    price,
                    _id,
                    productImage,
                    request: {
                        method: 'GET',
                        url: `${req.get('host')}${req.baseUrl}/${_id}`,

                    }
                }
            })
            onSucess(response, {
                request: {
                    method: 'POST',
                    url: `${req.get('host')}${req.baseUrl}`,
                    body: {
                        name: "String",
                        price: "Number",
                    }
                }, products
            })
        })
        .catch(error => onError(response, error))

})

router.post('/', upload.single('productImage'), (req, response, next) => {
    const product = createProduct(req)

    product.save().then(
        result => {
            const product = {
                ...result._doc,
                request: {
                    method: 'GET',
                    url: `${req.get('host')}${req.baseUrl}/${result._id}`,
                }
            }
            onSucess(response, product)
        }
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
            const product = {
                _id: result._id,
                name: result.name,
                price: result.price,
                request: [
                    {
                        method: 'DELETE',
                        url: `${req.get('host')}${req.baseUrl}/${result._id}`,

                    },
                    {
                        method: 'PATCH',
                        url: `${req.get('host')}${req.baseUrl}/${result._id}`,
                        body: {
                            name: "String",
                            price: "Number",
                        }

                    },
                ]
            }

            onSucess(response, product)
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
        .then(() => {
            const product = {
                message: 'Product has been updated!',
                request: [
                    {
                        method: ['DELETE', 'GET'],
                        url: `${req.get('host')}${req.baseUrl}/${_id}`,

                    },
                    {
                        method: 'POST',
                        url: `${req.get('host')}${req.baseUrl}`,
                        body: {
                            name: "String",
                            price: "Number",
                        }

                    },
                ]
            }
            onSucess(response, product)
        })
        .catch(error => onError(response, error))
})

router.delete('/:productId', (req, response, next) => {
    const _id = req.params.productId

    Product
        .deleteOne({ _id })
        .exec()
        .then(result => {
            const product = {
                message: 'Product was deleted!',
                request: [
                    {
                        method: 'GET',
                        url: `${req.get('host')}${req.baseUrl}/${result._id}`,

                    },
                    {
                        method: ['POST', 'PATCH'],
                        url: `${req.get('host')}${req.baseUrl}`,
                        body: {
                            name: "String",
                            price: "Number",
                        }

                    },
                ]
            }
            onSucess(response, product)
        })
        .catch(error => onError(response, error))
})

module.exports = router