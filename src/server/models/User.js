const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// const validator = require('validator')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  privilege: {
    type: Number,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    default: "Toronto, ON, Canada"
  },
  description: {
    type: String
  },
  profilePicture: {
    contentType: String,
    data: Buffer
  }
})

UserSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this
  return User.findOne({ username })
    .then((user) => {
      if (!user) return Promise.reject(Error(`404 user ${username} not found.`))
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (error, result) => {
          result && resolve(user)
          reject(Error('403 Invalid Password'))
        })
      })
    })
}

UserSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 10)
    next()
  }
  next()
})

UserSchema.pre('save', function (next) {
  const user = this
  return User.findOne({ username: user.username })
    .then((user) => {
      if (!user) next()
      next(Error(`User ${user.username} already exists.`))
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = { User }
