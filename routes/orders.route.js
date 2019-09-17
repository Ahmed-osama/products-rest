const express = require('express');
const verifyAuth = require('./../middleware/auth.mw')


const { getAllOrders, createNewOrder, getSingleOrder, updateSingleOrder, deleteSingleOrder } = require('./../controllers/orders.controller')
const router = express.Router();

router.get('/', verifyAuth, getAllOrders)

router.post('/', verifyAuth, createNewOrder)

router.get('/:orderId', verifyAuth, getSingleOrder)

router.patch('/:orderId', verifyAuth, updateSingleOrder)

router.delete('/:orderId', verifyAuth, deleteSingleOrder)

module.exports = router