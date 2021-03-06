const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const productRoutes = require('./routes/products.route');
const orderRoutes = require('./routes/orders.route');
const userRoutes = require('./routes/user.route');
const mongoose = require('mongoose')
const { DB_URL } = require('./constants')

mongoose.connect(DB_URL, { useNewUrlParser: true })
const app = express();
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: false,
  useMongoClient: true
}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/users', userRoutes)

app.use((req, res, next) => {
  res.header('Acess-Control-Allow-Origin', '*');
  res.header('Acess-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
})

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