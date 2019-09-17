const express = require('express');
const verifyAuth = require('./../middleware/auth.mw')
const { getAllUsers, signUp, logIn, deleteUser } = require('./../controllers/users.controller')

const router = express.Router();


router.get('/', verifyAuth, getAllUsers)

router.post('/signup', signUp)

router.post('/login', logIn)

router.delete('/:userId', verifyAuth, deleteUser)

module.exports = router