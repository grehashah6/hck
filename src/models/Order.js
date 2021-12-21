const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: [
    {
      status: {
        type: String,
        enum: ["Placed", "Dispatched", "Delivered"],
        default: "Placed",
      },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      itemType:String,
      name:String,
      currentQty:Number
    },
  ],
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  totalCost: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  pincode: {
    type: String,
    required: [true, "Location is needed"],
  },
});
module.exports = mongoose.model("Order", OrderSchema);
