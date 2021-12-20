const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
 const {
  createOrder,
  //sendOTPMail
  
} = require('../controllers/order')


//New Order 
router.post('/new', createOrder)

//Send Otp
//router.post('/deliver/:id',auth,sendOTPMail)

module.exports = router