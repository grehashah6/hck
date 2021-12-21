const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
 const {
  Payment,



} = require('../controllers/razorpay')

// 
router.post('/new',Payment)

module.exports = router