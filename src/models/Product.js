const mongoose = require('mongoose');
const User=require('../models/User.js')
const ProductSchema = new mongoose.Schema({
    quantity:{
        type:Number,
        required:[true,'Quantity must be mentioned'],
    },

    reviews: {
        type:Number,
        minimum:[1,'Least is One'],
        maximum:[5,'Most is Five']
    },
    cost:{
        type:Number,
        required:[true,'Cost needs to be mentioned']
    },
    seller:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },

});
module.exports = mongoose.model('Product', ProductSchema);