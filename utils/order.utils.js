

const mongoose = require('mongoose');
const Order = require('./../models/order');

const createOrder = ({ productId, quantity = 1 }) => new Order({

    _id: new mongoose.Types.ObjectId(),
    product: productId,
    quantity

})

module.exports = {
    createOrder
}