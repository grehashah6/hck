const Product = require("../models/Product.js");
const Order = require("../models/Order.js");
const User = require("../models/user")

exports.createOrder = async (req, res, next) => {
  // const user = await User.findById(req.user._id);
  orderItems = [];
  (totalCost = 0), (qty = 0);
  // if(user.role!=='buyer') {
  //   return res.status(401).json({
  //     success: false,
  //     data: 'You cannot place an order'
  //   });
  // }

  for (const x in req.body.products) {
    element = req.body.products[x];
    const product = await Product.findById(element.id);
    var st = "Placed";
    qty = element.quantity;
    if (element.quantity < product.minquantity) {
     
      
      // Order.find({ pincode: req.body.pincode })
      //   .find({ "products.status": "Placed" })
      //   .find({ "product._id": element.id })
      //   .then((pendingOrders) => {
      //     if (pendingOrders.length != 0) {
      //       for (const x in pendingOrders) {
      //         for (const y in pendingOrders[x].products) {
      //           if (pendingOrders[x].products[y].status == "Placed") {
      //             totalPendingQty = pendingOrders[x].products[y].currentQty;
      //           }
      //         }
      //       }
      //     }
      //   });
      st = "Placed";
    } else {
      st = "Dispatched";
    }
    orderItems.push({ status: st, product: product, currentQty: qty , itemType:product.itemtype , name:product.title });
    totalCost += product.cost * 0.5 * element.quantity;
  }

  const sameSeller = new Set(orderItems.map((v) => v.product.compname));
  if (sameSeller.size < orderItems.length) {
    totalCost = totalCost - totalCost * 0.05;
  }

  const orderObj = {
    products: orderItems,
    buyer: req.body.userID,
    totalCost: totalCost,
    pincode: req.body.pincode,
  };
  var order = new Order(orderObj);
  order.save();
  res.status(200).json({
    success: true,
    data: order,
  });
};

exports.getAllOrders = async (req, res, next) => {
  var pendingOrders = [];
  Order.find({ pincode: req.body.pincode })
    .find({ "products.status": "Placed" }).then(pending=>{
      pendingOrders=pending
      res.status(200).json({
        success:true,
        data: pendingOrders
      });
    });
  
};


const nodemailer=require('nodemailer')
var transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'codebrigade181221@gmail.com',
        pass:process.env.gmpass

    },
    port:465
})
exports.sendOTPMail = async(req,res,next)=>{
  //const order = await Order.findById(req.params.id);
  //const buyer=await User.findById(order.buyer);
  
  const otp=Math.floor(100000 + Math.random() * 900000)
  transporter.sendMail({
    from:"codebrigade181221@gmail.com",
    to:req.body.email,
    subject:`One time password for verification `,
    text:`Your One time Password for completing the delivery is ${otp}.Please share it with the delivery guy. `
  }
,(error,info)=>{
  if(error){
    res.status(400).json({
      success:false,
      data:error
    })
  }else{
    console.log(req.body.email)
    res.status(200).json({
      success:true,
      data:"mail succesfully sent",
      
      otp:otp
    })
  }
})
}