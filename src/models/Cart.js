const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    buyerId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:'User', 
        //required: true,
        unique: true 
    },
    productId: {
        type: String,
      },
    quantity: {
        type: Number,
        default: 1,
      }
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);