

const mongoose = require('mongoose');
const Order = require('../models/order.model');

/**
 * creates new instance of Order schema
 * @param {Object} request.body
 */
const createOrder = ({ productId, quantity = 1 }) => new Order({
  _id: new mongoose.Types.ObjectId(),
  product: productId,
  quantity
})

module.exports = {
  createOrder
}