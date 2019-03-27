const express = require('express')
const port = process.env.PORT || 3000
const { mongoose } = require('./Mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')

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
  if (req.session.user) {
    User.findById(req.session.user)
    .then((user) => {
      if(!user) return Promise.reject()
      req.user = user
      next()
    })
    .catch((error) => {
      // do something
    })
  } else {
    User.findById(req.body.username)
  }
}

/* ========== ROUTES ========== */
app.post('/users', (req, res) => {
  const { username, password, privilege, fullName, birthday, location, description } = req.body
  const user = new User({ username, password, privilege, fullName, birthday, location, description })
  user.save()
    .then((result) => res.send(result))
    .catch((error) => res.status(500).send(error))
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

// Login routes
app.post('/users/login', (req, res) => {
  const { username, password } = req.body
  User.findByUsernamePassword(username, password)
    .then((user) => {
      req.session.id = user._id
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
