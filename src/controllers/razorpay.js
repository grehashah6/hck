var express = require("express");
var app = express();
var Razorpay=require("razorpay");
var bodyParser = require('body-parser')

let instance = new Razorpay({
  key_id: 'rzp_test_8qGGUwUECLVVUr', 
  key_secret: process.env.razorkey 
})





exports.Payment = (req,res)=>{
    var params = {
        amount: req.body.amount,  
        currency: "INR",
        receipt: "su001",
        payment_capture: '1'
      };
    params=req.body;
    instance.orders.create(params).then((data) => {
            res.send({"sub":data,"status":"success"});
    }).catch((error) => {
        res.send({"sub":error,"status":"failed"});
    })
    
};




