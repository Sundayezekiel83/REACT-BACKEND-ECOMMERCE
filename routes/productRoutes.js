const express = require('express')

const router = express.Router()

const {userById, isAuth, isAdmin} = require('../controllers/userController')

const {protectedRouteFunction} = require("../controllers/authController")

const {create, productById, read, remove, list, update, listSearch, listRelated, listCategories, listBySearch, photo} = require('../controllers/productController')

router.post('/product/create/:userId', protectedRouteFunction, isAuth, isAdmin, create)

router.get('/product/:productId', read)

router.delete('/product/:productId/:userId', protectedRouteFunction, isAuth, isAdmin, remove)

router.get('/products', list)

router.get('/products/related/:productId', listRelated)

router.post('/products/search/by', listBySearch)

router.get('/products/search', listSearch)

router.get('/products/categories', listCategories)

router.get('/products/photo/:productId', photo)

router.put('/product/:productId/:userId', protectedRouteFunction, isAuth, isAdmin, update)


router.param('userId', userById)

router.param('productId', productById)

module.exports = router