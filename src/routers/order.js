const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
 const {
  createOrder,
  getAllOrders,
  sendOTPMail
  
} = require('../controllers/order')


//New Order 
router.post('/new',auth, createOrder)

//Get All Order
router.post('/getAll',auth, getAllOrders)

//Send Otp
router.post('/deliverotp/:id',auth,sendOTPMail)

module.exports = router

