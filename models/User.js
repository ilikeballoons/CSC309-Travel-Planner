const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// const validator = require('validator')

const ItinerarySchema = new mongoose.Schema({
  date: Date,
  location: String,
  name: String,
  events: Array
})

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
    type: String,
    default: "Hello World"
  },
  profilePicture: {
    type: String
  },
  itineraries: [ItinerarySchema]
})

UserSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this
  return User.findOne({ username })
    .then((user) => {
      if (!user) return Promise.reject(Error(`404 user ${username} not found.`))
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (error, result) => {
          result && resolve(user)
          reject(Error('403 Invalid Password' + error))
        })
      })
    })
}

UserSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 10)
    next()
  } else {
      next()
  }
})

UserSchema.pre('save', function (next) {
  const user = this
  return User.findOne({ username: user.username })
    .then((user) => {
      if (!user) next()
      return Promise.reject(Error('409'))
    })
})

UserSchema.statics.encryptPassword = (password) => bcrypt.hashSync(password, 10)

const User = mongoose.model('User', UserSchema)
module.exports = { User }
