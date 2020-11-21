
const express = require('express')

const router = express.Router()

const {create, listOrder, getStatusValues, updateOrderStatus, orderById} = require('../controllers/orderController')

const {userById, isAuth, addOrderToHistory, isAdmin} = require('../controllers/userController')
const {decreaseQuantity} = require('../controllers/productController')

const {protectedRouteFunction} = require("../controllers/authController")

router.post('/order/create/:userId', protectedRouteFunction, isAuth, addOrderToHistory, decreaseQuantity, create )

router.put('/order/:orderId/status-values/:userId', protectedRouteFunction, isAuth, updateOrderStatus )

router.get('/order/list/:userId', protectedRouteFunction, isAuth, isAdmin, listOrder)

router.get('/order/status-value/:userId', protectedRouteFunction, isAuth, isAdmin, getStatusValues)

router.param('orderId', orderById)

router.param('userId', userById)


module.exports = router