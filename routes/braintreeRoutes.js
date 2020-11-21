

const express = require('express')

const router = express.Router()

const { protectedRouteFunction } = require('../controllers/authController')
const {generateToken, processPayment} = require('../controllers/braintreeController')
const {userById, isAuth, isAdmin} = require('../controllers/userController')






router.get('/braintree/getToken/:userId', protectedRouteFunction, isAuth, generateToken )

router.post('/braintree/payment/:userId', protectedRouteFunction, isAuth, processPayment )


router.param('userId', userById)

module.exports = router