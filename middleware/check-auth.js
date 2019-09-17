const jwt = require('jsonwebtoken')
const { onError } = require('./../utils/server.utils')
module.exports.verifyAuth = (req, res, next) => {

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