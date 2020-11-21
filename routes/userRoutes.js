const express = require('express')
router = express.Router()
const {protectedRouteFunction} = require('../controllers/authController')

const { userById, isAuth, read, update, purchaseHistory} = require('../controllers/userController')



// router.get('/secret/:userId', protectedRouteFunction, isAuth, isAdmin, (req, res)=>{

//         res.json({
//             user: req.profile
//         })

// } )

router.get('/user/:userId', protectedRouteFunction, isAuth, read)

router.put('/user/:userId', protectedRouteFunction, isAuth, update)
router.get('/orders/by/user/:userId',  protectedRouteFunction, isAuth, purchaseHistory);

router.param('userId', userById )


module.exports = router