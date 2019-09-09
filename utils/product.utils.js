

const mongoose = require('mongoose');
const Product = require('./../models/product');

const createProduct = req => new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
})

module.exports = {
    createProduct
}