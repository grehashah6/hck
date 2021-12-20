const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
 const {
  createCart,
  
//   viewCart,
//   updateCart,
  
//   deleteCart


} = require('../controllers/cart')

//Create New Cart 
router.post('/new', auth,createCart)

module.exports = router