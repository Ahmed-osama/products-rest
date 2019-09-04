const express = require('express');
const morgan = require('morgan')
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');


const app = express();
app.use(morgan('dev'))
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req, res, next) => {
    const error = new Error(req.url + ' is Not Found');
    res.status = 404;
    next(error)
})
app.use((err, req, res, next) => {

    res.status(err.status || 500);
    res.json({
        error: {
            status: err.status,
            message: err.message
        }
    })
    next(error)
})
module.exports = app