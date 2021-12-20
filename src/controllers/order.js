const Product = require('../models/Product.js')
const Order = require('../models/Order.js')
const User = require('../models/User.js')

exports.createOrder= async(req,res,next)=>{
    const user = await User.findById(req.user._id);
  
    if(user.role!=='buyer') {
      return res.status(401).json({
        success: false,
        data: 'You cannot place an order'
      });
    }
  
    const product = await Product.findById(req.body.product);
    console.log(product);
  
    const orderObj = {
      product: req.body.product,
      quantity: req.body.quantity,
      buyer: req.user._id,
      seller: product.compname,
      totalCost: (req.body.quantity * product.cost),
    }
    if(orderObj.quantity<=product.maxquantity){
      const order = await Order.create(orderObj);
      product.quantity -= orderObj.quantity;
      product.save()
      return res.status(200).json({
        success: true,
        data: order
      })
    }
    res.status(400).json({
      success: true,
      data: `only ${product.maxquantity} are available`
    });
  };