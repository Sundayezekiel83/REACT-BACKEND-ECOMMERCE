
const User = require('../Models/authModel')
const { errorHandler } = require('../helpers/helpers')
const { Order} = require('../Models/orderModel')
exports.userById = (req, res, next, id) =>{

    User.findById(id).exec((err, user)=>{
        if(!user || err){
            res.status(200).json({
                message: `The user with the ${id} doesnt exist`
            })
        }else{

            req.profile = user
        }
        next();
    })

}

exports.isAuth = (req, res, next) =>{

        let user = req.profile && req.auth && req.profile._id == req.auth._id;

        if(!user) {
            return res.status(403).json({
                error: "Access Denied"
            })
        }
        next();
       
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Admin Resource Access Denied"
        })
    }
    next()
}

exports.read = (req, res)=>{
    
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}


exports.update = (req, res) =>{

    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user)=>{
        if(err){
            return res.status(400).json({
                error: "You are not authorized to perform this actions"
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;

        res.json(user)
    })
}

exports.addOrderToHistory = (req, res, next) =>{

                let history = []

                req.body.order.product.forEach((items)=>{
                    history.push({
                        _id: items._id,
                        name: items.name,
                        description: items.description,
                        category: items.category,
                        quantity: items.count, 
                        transaction_id: req.body.order.transaction_id,
                        amount: req.body.order.amount
                    })
                })

            User.findOneAndUpdate({_id: req.profile._id}, {$push: {history: history}}, {new: true}, (error, data)=>{
                if(error){
                    return res.status(400).json({
                        error: 'could not update user profile'
                    })
                }else{
                    next();
                }
            })
}



exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(orders);
        });
};
