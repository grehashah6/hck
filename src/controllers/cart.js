const Cart = require("../models/Cart")
exports.createCart = async (req, res) => {
    try {
      const cart = new Cart(req.body)
  
      
    
        const savedCart = await cart.save() 
        
        res.status(201).json({
          success: true,
          data: savedCart, 
        })
      }catch(e){
        res.status(400).json({
          success: false,
          message: e.message
        })
      }
  }

exports.UserCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  };



