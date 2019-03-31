const express = require('express')
const port = process.env.PORT || 3001
const { mongoose } = require('./Mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const { ObjectID } = require('mongodb')

// make some models and import em
const { User } = require('./models/User')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// session middleware
app.use(session({
  secret: 'oursecret', //TODO: change this to a string defined somewhere
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000,
    httpOnly: true
  }
}))

/* ========== MIDDLEWARE ========== */
const sessionChecker = (req, res, next) => req.session.user ? next() : next() //TODO: change the pass clause to do something
const authenticate = (req, res, next) => {
  if (req.session.userid) {
    User.findById(req.session.userid)
      .then((user) => {
        if (!user) return Promise.reject()
        req.user = user
        next()
      })
      .catch((error) => res.status(403).send(error)) //TODO: something better
  } else {
    return res.status(403).send()
  }
}

/* ========== ROUTES ========== */
app.post('/users', (req, res) => {
  const { username, password, privilege, fullName, birthday, location, description } = req.body
  const user = new User({ username, password, privilege, fullName, birthday, location, description })
  user.save()
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      if (error.message === `User ${user.username} already exists.`) res.status(409).send()
      else res.status(500).send(error)
    })
})

// get all users
app.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) res.status(404).send()
      res.send(users)
    })
    .catch((error) => res.status(500).send(error))
})

// get users by username or fullName
app.get('/users/:name', (req, res) => {
  const name = req.params.name
  User.find({
    $or: [
      { 'username': { $regex: new RegExp(name, 'i') } },
      { 'fullName': { $regex: new RegExp(name, 'i') } }
    ]
  })
    .then((users) => {
      if (!users) res.status(404).send()
      res.send(users)
    })
    .catch((error) => res.status(500).send(error))
})

app.get('/users/:username/:password', (req, res) => {
  User.findByUsernamePassword(req.params)
    .then((user) => {
      if (!user) res.status(404).send()
      res.send(user)
    })
    .catch((error) => {
      if (error.message === '403 Invalid Password') res.status(403).send()
      else res.status(500).send(error)
    })
})

app.patch('/users', authenticate, (req, res) => {
  const id = req.session.userid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  const { username, fullName, birthday, location, description, profilePicture } = req.body
  const properties = { username, fullName, birthday, location, description, profilePicture }
  User.findByIdAndUpdate(id, { $set: properties }, { new: true })
    .then((user) => {
      if (!user) res.status(404).send()
      else res.send(user)
    })
    .catch((error) => res.status(500).send(error))
})

app.delete('/users', (req, res) => {
  const id = req.body._id
  console.log('username is: ' + req.body.username)
  console.log(id)
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) res.status(404).send()
      else res.send(user)
    })
    .catch((error) => res.status(500).send(error))
})

// Login routes
app.post('/users/login', (req, res) => {
  const { username, password } = req.body
  User.findByUsernamePassword(username, password)
    .then((user) => {
      req.session.userid = user._id
      req.session.username = user.username
      res.send(user) // TODO: check
    })
    .catch((error) => {
      if (error.message === `404 user ${username} not found.`) res.status(404).send()
      else if (error.message === `403 Invalid Password`) res.status(403).send()
      else res.status(500).send()
    })
})

app.get('/users/logout', (req, res) => {
  req.session.destroy((error) => {
    error
      ? res.status(500).send(error)
      : res.redirect('/')
  })
})

app.listen(port, () => console.log(`Listening on port ${port}...`))
