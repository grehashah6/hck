const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
 const {
  createUser,
  loginUser,
  updateUser,
  getUsers,
  deleteUser,
  getBuyers,
  getSellers,
  logoutUser

} = require('../controllers/user')

//Create New User 
router.post('/new', createUser)

//Login User - Public
router.post('/login', loginUser )

//Logout User
router.post('/logout', auth, logoutUser)

//Get Users
router.get('/get',auth, getUsers,)

//Get Students
router.get('/getbuyers', auth,getBuyers)

//Get Students
router.get('/getsellers', auth,getSellers)

//Update User
router.patch('/update/:id',auth, updateUser)

//Enroll New Student
router.patch('/enroll/:id',auth, enrollCourse)

//Delete User
router.delete('/delete/:id',auth, deleteUser)




module.exports = router