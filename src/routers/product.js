const express = require('express')
const multer =require('multer')
const router = new express.Router()
const auth = require('../middleware/auth')
 const {
  createProduct,
//   loginUser,
//   viewUser,
   updateProduct,
   getProduct,
   getProductbyProdName,
   getProductByCompName,
   deleteProducts,
   
//   getBuyers,
//   getSellers,
//   logoutUser

} = require('../controllers/product')

// const storage = multer.diskStorage({
//     destination:function(req , file , cb){
//         cb(null , './public/uploads')
//     },
//     filename: function(req , file , cb){
//         cb(null , file.originalname);  
//     }
//   });
  
//   const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 2,
//       },
//     fileFilter: (req, file, cb) => {
//       if (
//         file.mimetype == 'image/png' ||
//         file.mimetype == 'image/jpg' ||
//         file.mimetype == 'image/jpeg'
//       ) {
//         cb(null, true);
//       } else {
//         cb(null, false);
//         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//       }
//     }
//   });
  

//Create New Product 
router.post('/new',auth,createProduct)

// GET PRODUCTS
router.get('/get', getProduct)

//GET PRODUCTS BY NAME
router.get('/getbyProdname/:title', getProductbyProdName)



// GET PRODUCTS BY COMPANY
router.get('/getbyProdcomp/:compname', getProductByCompName)



//Update Product
router.patch('/update/:id',auth, updateProduct)



// //Delete User
router.delete('/delete/:id',auth, deleteProducts)




module.exports = router