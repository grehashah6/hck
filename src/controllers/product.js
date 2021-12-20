const Product=require('../models/Product.js')
const User = require('../models/user.js');


exports.createProduct = async (req, res, next) => {
    

    
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
}

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

exports.getProductbyProdName = async (req,res) => {
    try{
        const getProductByseller = await Product.find({title: req.params.title})

        if (!getProductByseller.length) {
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

exports.getProductByCompName = async (req,res) => {
    try{
        const getProductByCompName = await Product.find({compname: req.params.compname})

        if (!getProductByCompName.length) {
            throw new Error('Product not found');
           }

        res.json({
            success: true,
            data: getProductByCompName
        })
    } catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.updateProduct = async (req, res) => {

  
    const _id = req.params.id

  
    try {
      const product = await Product.findOneAndUpdate({_id: _id}, req.body, {new:true})
    
      if(!product){
        return res.status(404).send('Product not found')
     }
        
        res.json({
          success: true,
          data: product
        })
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message
      })
  
    }
  }

exports.deleteProducts = async (req, res) => {
    try {
       const product = await Product.findOneAndDelete({_id: req.params.id});
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

