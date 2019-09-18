const jwt = require('jsonwebtoken')
const { onError } = require('./../utils/server.utils')

/**
 *  jwt verify middle ware
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
module.exports = (req, res, next) => {

  try {
    const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY)
    req.userData = decoded
    next()
  } catch{
    onError(res, {
      message: 'faild to authnticate user'
    })
  }
}