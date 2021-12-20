const Product = require('../models/Product.js')
const Order = require('../models/Order.js')

exports.createOrder= async(req,res,next)=>{
   // const user = await User.findById(req.user._id);
    orderItems = []
    totalCost=0;
    // if(user.role!=='buyer') {
    //   return res.status(401).json({
    //     success: false,
    //     data: 'You cannot place an order'
    //   });
    // }
    
    for (const x in req.body.products){
      element = req.body.products[x]
      const product = await Product.findById(element.id);
      var st="Placed";
      if(element.quantity < product.minquantity){
        st="Placed"
      }else{
        st = "Dispatched"
      }
      orderItems.push({status: st, product: product})
      totalCost+= product.cost * 0.5 * element.quantity
    }
      
  

    const sameSeller = new Set(orderItems.map(v => v.product.compname));
    if(sameSeller.size<orderItems.length){
      totalCost=totalCost - totalCost*0.05
    }
   
    const orderObj = {
      products: orderItems,
      buyer: req.body.userID,
      totalCost: totalCost,
      pincode:req.body.pincode
    }
    var order = new Order(orderObj)
    order.save()
    res.status(200).json({
      success: true,
      data:order 
    });
};
const nodemailer=require('nodemailer')
// var transporter=nodemailer.createTransport({
//     service:'Gmail',
//     auth:{
//         user:'codebrigade181221@gmail.com',
//         pass:process.env.gmpass

//     },
//     port:465
// })
// exports.sendOTPMail = async(req,res,next)=>{
//   const order = await Order.findById(req.params.id);
//   const buyer=await User.findById(order.buyer);
  
//   const otp=Math.floor(100000 + Math.random() * 900000)
//   transporter.sendMail({
//     from:"nodeforme@gmail.com",
//     to:buyer.email,
//     subject:"One time password for verification",
//     message:`Your One time Password for completing the delivery is ${otp}.Please share it with the delivery guy. `
//   }
// ,(error,info)=>{
//   if(error){
//     res.status(400).json({
//       success:false,
//       data:"Mail was not sent"
//     })
//   }else{
//     res.status(200).json({
//       success:true,
//       data:"mail succesfully sent",
//       otp:otp
//     })
//   }
// })
// }