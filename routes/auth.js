
const express = require('express')
const {userSignUpValidator} = require('../validator/userValidator')
const router = express.Router()
//usersController
const {signUp, signIn, signOut, protectedRouteFunction} = require('../controllers/authController')


//get router

router.post('/signup', userSignUpValidator, signUp) 

router.post('/signin', signIn) 

router.get('/signout', signOut)

router.get('/hello', protectedRouteFunction, (req, res) =>{

    res.send("hello world")
} )

module.exports = router