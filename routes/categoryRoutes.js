const express = require('express')

const router = express.Router()

const {categoryValidator} = require('../validator/categoryValidator')

const {create, categoryById, read, remove, getAllCategory, updated} = require('../controllers/categoryController')

const {userById, isAuth, isAdmin} = require('../controllers/userController')

const { protectedRouteFunction } = require('../controllers/authController')

router.post('/category/create/:userId', categoryValidator, protectedRouteFunction, isAuth, isAdmin, create)

router.get('/category/:categoryId',  read)

router.delete('/category/:categoryId/:userId', protectedRouteFunction, isAuth, isAdmin, remove)

router.get('/categories', getAllCategory)

router.put('/category/:categoryId/:userId', protectedRouteFunction, isAdmin, isAuth, updated )

router.param('categoryId', categoryById)

router.param('userId', userById )





module.exports = router