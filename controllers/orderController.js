
const { errorHandler } = require('../helpers/helpers')
const { Order, CartItem} = require('../Models/orderModel')

exports.create = (req, res)=>{

    console.log('creating orders:', req.body)

     req.body.order.user = req.profile //i dont understand dis line

     const order = new Order(req.body.order)

     order.save((err, data)=>{
         if(err){
             return res.status(400).json({
                 error: errorHandler(err)
             })
         }
         res.json(data)
     })

}

exports.getStatusValues = (req, res) =>{
    res.json(Order.schema.path('status').enumValues);
}

exports.listOrder = ( req, res) => {
    
    Order.find()
    .populate('user', '_id name address')
    .sort('-created')
    .exec((err, orders)=>{
        if(err){
           return res.status(400).json({
               error: errorHandler(err)
           })
        }else{
            return res.status(200).json(orders)
        }
    })
}

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('product.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};


