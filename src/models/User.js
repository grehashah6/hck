const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name']
  },
  address: {
    type: String,
    required: [true, 'Please add the Address']
  },

  email: {
    type: String,
    unique: [true, 'Email already taken'],
    required: [true, 'Please add an email id'],
  },

  mobile: {
    type: Number,
    trim:true,
    required: [true, 'Please add a number'],
    unique: [true, 'Number already in use'],
    minLength: 10,
    maxLength: 10
  },

  role: {
    type: String,
    enum: ['seller', 'buyer'],
    
    required:[true,'role must be defined']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minLength: 8
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'secretkeyisunicode')
  
    user.tokens = user.tokens.concat({ token })
    await user.save()
  
    return token
  
  } 
  
  userSchema.statics.findByCredentials = async function ( email, password ) {
    const user = await this.findOne({ email })
  
    if(!user) {
      throw new Error('Unable to login')
    }
  
    const isMatch = await bcrypt.compare(password, user.password)
  
    if(!isMatch) {
      throw new Error('Unable to login')
    }
  
    return user
  }
  
  
  userSchema.pre('save', async function (next) {
    const user = this
  
    if(user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
    }
  
    next()
  })

module.exports = mongoose.model('User', UserSchema);