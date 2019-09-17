
const bcrypt = require('bcrypt');


module.exports.isAuth = (inputPW, dbPW) => new Promise((resolve, reject) => {
    bcrypt.compare(inputPW, dbPW, (err, result) => {
        if (err) reject("password is not matching!!")
        if (result) resolve(result)
    })
})