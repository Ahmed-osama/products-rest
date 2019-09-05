

const mongoose = require('mongoose');
const Product = require('./../models/product');

const createProduct = product => new Product({
    _id: new mongoose.Types.ObjectId(),
    name: product.name,
    price: product.price
})

module.exports = {
    createProduct
}