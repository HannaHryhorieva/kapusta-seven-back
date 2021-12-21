const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [false, 'Password is required'],
  },
  name: {
    type: String,
    required: false,
    default: 'User Name'
  },
  picture: {
    type: String,
    required: false,
  },
  balance: {
    type: Number.parseFloat(0E-2),
    default: 0
  },
  date: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
  isGoogle: {
    type: Boolean,
    default: false
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
},
{
  versionKey: false,
})

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
