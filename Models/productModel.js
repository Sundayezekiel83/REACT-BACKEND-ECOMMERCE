
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,

    },

    description : {
        type: String,
        required: true,
        trime: true,
        maxLength: 2000
    },

    category :{
        
        type: mongoose.Schema.ObjectId,
        ref: "Category",
       required: true
      
    },

    price :{
        type: Number,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
            },
            sold: {
                type: Number,
                default: 0
                    },

            shipping : {
                type: Boolean,
                required: false
            },
    photo : {
        data: Buffer, 
        contentType: String
    }
    

}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)
