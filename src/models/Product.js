const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true,'Title must be mentioned']
    },
    desc: {
        type: String,
        required:[true,'Desc must be mentioned']
    },
    img: {
        type: String,
        //required:true
    },
    minquantity:{
        type:Number,
        required:[true,'Minimum quantity must be mentioned'],
    },

    // maxquantity:{
    //     type:Number,
    //     required:[true,'Maximum quantity must be mentioned'],
    // },

    reviews: {
        type:Number,
        minimum:[1,'Least is One'],
        maximum:[5,'Most is Five']
    },

    itemtype: {
        type:String,
        required:[true, 'Item should be included'],


    },

    brand: {
        type:String,
        //required:[true,'Brand should be included']
    },



    cost:{
        type:Number,
        required:[true,'Cost needs to be mentioned']
    },
    seller:{
      type:mongoose.Schema.Types.ObjectId,
      //required:true,
      ref:'User'
    },compname:{
        type: String,
        required:[true,"Company name"]
    }

});
module.exports = mongoose.model('Product', ProductSchema);