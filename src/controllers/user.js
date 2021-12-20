const User = require('../models/user')


exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body)

    const token = await user.generateAuthToken()
  
    
      await user.save()
      res.status(201).json({
        success: true,
        data: user, token
      })
    }catch(e){
      res.status(400).json({
        success: false,
        message: e.message
      })
    }
}

exports.loginUser = async (req, res) => {
  try{
    

    const user = await User.findByCredentials(req.body.email, req.body.password)

    const token = await user.generateAuthToken()

    res.status(201).json({
      success: true,
      data: user, token
    })

  } catch(e){
    console.log(e)
    res.status(400).json({
      success: false,
      message: "Check Email or Password"
    })
  }
}

exports.updateUser = async (req, res) => {
  
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['mobile','address']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await User.findOneAndUpdate({_id: _id}, req.body, {new:true})
  
    if(!user){
      return res.status(404).send('User not found')
   }
      
      res.json({
        success: true,
        data: user
      })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message
    })

  }
}

exports.logoutUser = async (req,res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()

    res.send()
} catch (e) {
    res.status(500).send()
}

}

exports.viewUser = async (req, res) => {
  res.send(req.user);
};

exports.getUsers = async (req,res) => {
  try{
      const getUser = await User.find({})
      if (!getUser.length) {
        throw new Error('No users!')
       }
      res.json({
          success: true,
          data: getUser
         
      })
  } catch(e) {
      res.status(400).json({
          success: false,
          message: e.message
      })
  }
}

exports.getBuyers = async (req, res) => {
  try{
    const getBuyers = await User.find({role: 'buyer'})
    if (!getBuyers.length) {
      throw new Error('No Buyers!')
     }
    res.json({
        success: true,
        data: getBuyers
       
    })
} catch(e) {
    res.status(400).json({
        success: false,
        message: e.message
    })
}
}

exports.getSellers = async (req, res) => {
  try{
    const getSellers = await User.find({role: 'Seller'})
    if (!getSellers.length) {
      throw new Error('No Sellers!')
     }
    res.json({
        success: true,
        data: getSellers
       
    })
} catch(e) {
    res.status(400).json({
        success: false,
        message: e.message
    })
}
}

exports.updateUser = async (req, res) => {
    
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['mobile','address']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await User.findOneAndUpdate({_id: _id}, req.body, {new:true})
  
    if(!user){
      return res.status(404).send('User not found')
   }
      
      res.json({
        success: true,
        data: User
      })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message
    })

  }
}

exports.deleteUser = async (req, res) => {
  const _id = req.params.id  
  try {
      const user = await User.findOneAndDelete({_id:_id})
      if (!_id) {
        throw new Error('No users to delete!');
    }
      res.json({
        success: true,
        data: req.user
      })
    } catch (e) {
      res.status(500).json({
        success: false,
        message: e.message
      })
    }
}