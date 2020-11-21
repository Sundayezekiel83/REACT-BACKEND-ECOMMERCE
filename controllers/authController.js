
const User = require('../Models/authModel')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const {errorHandler} = require('../helpers/helpers')

//User sign Up Controller
exports.signUp = (req, res) =>{

          const user = new User(req.body);

         user.save((err, user) =>{
             if(err){
                  return res.status(500).json({
               error: "Email Already Exist"
                 })
             } user.salt = undefined
                user.hashed_password=undefined
             res.status(200).json({
                             user
             })
               
             
         })
        
    
}

//end of UserUp Controller


//User Signin Controller
exports.signIn = (req, res) => {

       
   //find the user base on the email 
   const {email, password} = req.body

   User.findOne({email}, (err, user)=>{

        if(err || !user) {
            return res.status(400).json({
                error: "Authentication failed or user doesnt exist "
            })
        } else {
            //if user is found check if email matches with the password 
                if(!user.authenticate(password)){
                    return res.status(401).json({
                        error: "Email and Password doesn't match"
                    })
                }


            //create authentication in user model 
            
            //generate a signin token with userID and secret 

            const token = jwt.sign({_id:user._id}, process.env.Jwt_SecretKey)

            //persist the token as 't' in cookie with expiry data
            res.cookie('t', token, {expire: new Date() + 9999})

            //return response with user and token to frontend client
            const {_id, name, email, role} = user

            return res.json({token, user: {
                _id, email, name, role
            }})

               
        }


   })

}
//end of user Sigin Controller

exports.signOut = (req, res) => {
    res.clearCookie('t')

    res.status(200).json({message: "signOut SuccessFul"})
}

exports.protectedRouteFunction = expressJwt({
    secret: process.env.Jwt_SecretKey,
    algorithms: ["HS256"],
    userProperty: "auth"

})

