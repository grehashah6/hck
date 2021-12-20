const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
 const {
  createUser,
  loginUser,
  viewUser,
  updateUser,
  getUsers,
  deleteUser,
  getBuyers,
  getSellers,
  logoutUser,
  OTPlogin

} = require('../controllers/user')

//Create New User 
router.post('/new', createUser)

//Login User - Public
router.post('/login', loginUser )

//Logout User
router.post('/logout', auth, logoutUser)

//View User
router.get('/viewprofile',auth, viewUser)

//Get Users
router.get('/get', getUsers)

//Get Buyers
router.get('/getbuyers', auth,getBuyers)

//Get Sellers
router.get('/getsellers', auth,getSellers)

//Update User
router.patch('/update/:id',auth, updateUser)

//OTP login
router.post('/otplog', OTPlogin)


//Delete User
router.delete('/delete/:id',auth, deleteUser)




module.exports = router