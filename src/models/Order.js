const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    quantity:{
        type:Number,
        required:[true,'quantity needs to be mentioned']
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },

    totalCost:{
        type: Number,
        default: 0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:['Placed','Dispatched','Delivered'],
        default:'Placed'
    },
    Pincode:{
        type:Number,
        required:[true, 'Location is needed']
    }
});
module.exports = mongoose.model('Order', OrderSchema);