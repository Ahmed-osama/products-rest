
const bcrypt = require('bcrypt');

/**
 * checks if user is authanticated
 * @param {String} inputPW 
 * @param {String} dbPW 
 */
module.exports.isAuth = (inputPW, dbPW) => new Promise((resolve, reject) => {
  bcrypt.compare(inputPW, dbPW, (err, result) => {
    if (err) reject("password is not matching!!")
    if (result) resolve(result)
  })
})