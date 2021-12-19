const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
 const {
  createProduct,
//   loginUser,
//   viewUser,
//   updateUser,
//   getUsers,
//   deleteUser,
//   getBuyers,
//   getSellers,
//   logoutUser

} = require('../controllers/product')

//Create New User 
router.post('/new', createProduct)

// //Login User - Public
// router.post('/login', loginUser )

// //Logout User
// router.post('/logout', auth, logoutUser)

// //View User
// router.get('/viewprofile',auth, viewUser)

// //Get Users
// router.get('/get', getUsers)

// //Get Students
// router.get('/getbuyers', auth,getBuyers)

// //Get Students
// router.get('/getsellers', auth,getSellers)

// //Update User
// router.patch('/update/:id',auth, updateUser)



// //Delete User
// router.delete('/delete/:id',auth, deleteUser)




module.exports = router