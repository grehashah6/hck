const express = require('express')
const multer =require('multer')
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

const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , './public/uploads')
    },
    filename: function(req , file , cb){
        cb(null , file.originalname);  
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
      },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });
  

//Create New User 
router.post('/new', upload.single('file'),createProduct)

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