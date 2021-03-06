
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isAuth } = require('./../utils/login.utils')
const {
  onSucess,
  onError
} = require('./../utils/server.utils')


/**
 * gets all users 
 * @param {Object} req 
 * @param {Object} response 
 * @param {Function} next 
 * @returns { Array<Object> }
 */
function getAllUsers(req, response, next) {
  User
    .find()
    .exec()
    .then(result => {
      onSucess(response, result)
    })
    .catch(error => onError(response, error))
}

/**
 * create new user 
 * @param {Object} req 
 * @param {Object} response 
 * @param {Function} next 
 * @returns { Object }
 */
function signUp(req, response, next) {
  let password = new Promise((res, rej) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) rej(err)
      res(hash)
    })
  })

  User.find({ email: req.body.email })
    .exec()
    .then(async user => {
      if (user.length) {
        throw 'this email already exists'
      }

      return Promise.resolve(new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: await Promise.resolve(password).catch(err => onError(response, err)),
      }))

    })
    .then(user => user.save())
    .then(result => onSucess(response, result))
    .catch(error => onError(response, error))
}


/**
 * signs user in and returns a valid token
 * @param {Object} req 
 * @param {Object} response 
 * @param {Function} next 
 * @returns { Object }
 */
function logIn(req, response, next) {
  User
    .find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length < 1) {
        throw "unknown user";
      }
      return users[0]
    })
    .then(async user => {
      const isuserAuth = await isAuth(req.body.password, user.password)
      return { isuserAuth, user }
    })
    .then(({ isuserAuth, user: { _id, email } }) => {
      if (isuserAuth) {
        const token = jwt.sign(
          { _id, email },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        )
        onSucess(response, {
          message: 'user loged in!',
          token
        })
      }
    })
    .catch(error => onError(response, error))
}


/**
 * Deletes a user by its id
 * @param {Object} req 
 * @param {Object} response 
 * @param {Function} next 
 * @returns { Object }
 */
function deleteUser(req, response, next) {
  const _id = req.params.userId
  User
    .deleteOne({ _id })
    .then(() => {
      const mappedResult = {
        message: 'user has been deleted!',
        request: [
          {
            method: "POST",
            url: `${req.get('host')}${req.baseUrl}/signup`,
            body: {
              email: "String",
              passwoord: "String",
            }
          }

        ]
      }
      onSucess(response, mappedResult)
    })
    .catch(error => onError(response, error))
}
module.exports = {
  getAllUsers,
  signUp,
  logIn,
  deleteUser
}