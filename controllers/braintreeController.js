
const braintree = require('braintree')

const User = require('../Models/authModel')

require('dotenv').config()

const gateway =new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.Merchant_key,
    publicKey: process.env.Public_key,
    privateKey: process.env.Private_Key,

})


exports.generateToken = (req, res, next)=>{
        //connect to brainstree

  gateway.clientToken.generate({}, function(err, response){
      if(err){
                res.status(500).send(err)
      }else{
          res.status(200).send(response)
      }
    })

}

exports.processPayment = (req, res, next)=>{
    let nouncefromClient = req.body.paymentMethodNonce
    let amountfromClient = req.body.amount
    //charge 
    let newTransaction = gateway.transaction.sale({
        amount: amountfromClient,
        paymentMethodNonce: nouncefromClient,

        options: {
                submitForSettlement: true
        }
    }, (err, result)=>{
            if(err){
                res.status(500).json(error)
            }else{
                res.json(result);
            }
    })
}
