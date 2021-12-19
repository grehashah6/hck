const Product=require('../models/Product.js')
const User = require('../models/user.js');


exports.createProduct = async (req, res, next) => {
    // const user = await User.findById({_id:req.user._id});
    // if(user.role!=="seller"){
    //   return res.status(401).json({
    //       success:false,
    //       data:"Access denied"
    //   })
  //}
  const product = new Product(req.body)
  try {
    await product.save()
    res.status(201).json({
      success: true,
      data: product
    })
  }catch(e){
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
  };

exports.getProduct = async (req,res) => {
    try{
        const getProduct = await Product.find({})
        if (!getProduct.length) {
            throw new Error('No Products!')
           }
        res.json({
            success: true,
            data: getProduct
           
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.getProductbByseller = async (req,res) => {
    try{
        const getProductByseller = await Product.find({seller: req.params.seller})

        if (!getProductByseller.lenght) {
            throw new Error('Product not found');
           }

        res.json({
            success: true,
            data: getProductByseller
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.getProductByName = async (req,res) => {
    try{
        const getProductByName = await Product.find({name: req.params.name})

        if (!getProductByName.lenght) {
            throw new Error('Product not found');
           }

        res.json({
            success: true,
            data: getProductByName
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

// exports.updateProduct = async (req, res) => {
//     const user = await User.findById({_id:req.user._id});
//     if(user.role!=="seller"){
//       return res.status(401).json({
//           success:false,
//           data:"Access denied"
//       })
//   }
  
//     const _id = req.params.id
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name','descr','duration']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  
//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }
  
//     try {
//       const product = await Product.findOneAndUpdate({_id: _id}, req.body, {new:true})
    
//       if(!product){
//         return res.status(404).send('Product not found')
//      }
        
//         res.json({
//           success: true,
//           data: product
//         })
//     } catch (e) {
//       res.status(500).json({
//         success: false,
//         message: e.message
//       })
  
//     }
//   }

exports.deleteProducts = async (req, res) => {
    try {
       const product = await Product.findOneAndDelete({_id: req.params.id, intructor: req.user._id});
       if (!product) {
           res.status(404).json({
               message: "Product does not exist"
            });
        } else {
            res.status(201).json({
                message: "Product has been deleted",
                data: product
            });
        }
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

