const express = require('express')
const router = new express.Router()
 const {
  createOrder
  
} = require('../controllers/order')

//New Order 
router.post('/new', createOrder)

module.exports = router