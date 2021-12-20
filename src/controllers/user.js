const User = require('../models/user')
const { Auth, LoginCredentials } = require("two-step-auth");
var OTP ;

async function login(emailId) {
try {
	const res = await Auth(emailId, "FindIn");
	// console.log(res);
	// console.log(res.mail);
	// OTP=res.OTP;
	// console.log(res.success);
} catch (error) {
	console.log(error);
}
}

// // This should have less secure apps enabled
LoginCredentials.mailID = "codebrigade181221@gmail.com";

// // You can store them in your env variables and
// // access them, it will work fine
LoginCredentials.password = process.env.gmpass;
// LoginCredentials.use = true;

// // Pass in the mail ID you need to verify
// login("verificationEmail@anyDomain.com");


 
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
    login(req.body.email)

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

exports.OTPlogin= async (req,res) => {
  if(OTP=req.body.OTP){
    res.status(201).json({
      success: true,
      data: "Succesful OTP Authentication!"
    })}else {
      res.status(400).json({
        success: false,
        message: "Wrong! Please Try again!"
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
    const getSellers = await User.find({role: 'seller'})
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