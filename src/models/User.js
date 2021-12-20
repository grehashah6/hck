const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();

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
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please add a valid email'
    ]
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
  // resetPasswordToken: String,
  // resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  tokens: [{
    token: {
        type: String, 
        required: true
    }
}]
});

UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString()},process.env.secretkey )
  

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
      throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
      throw new Error('Unable to login')
  }

  return user
}

// Hash the plain text password before saving
UserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User