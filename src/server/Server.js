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
        if (!user) res.status(404).send()
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
  const { username, password, privilege, fullName, birthday, location, description, profilePicture } = req.body
  const user = new User({ username, password, privilege, fullName, birthday, location, description, profilePicture })
  user.save()
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      if (error.message === '409') res.status(409).send()
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
      if (error.message.includes('403')) res.status(403).send()
      else res.status(500).send(error)
    })
})

app.patch('/users', authenticate, (req, res) => {
  const id = req.session.userid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  
  const { username, fullName, password, birthday, location, description, profilePicture } = req.body

  const properties = { username, fullName, birthday, location, description, profilePicture }
  password && (properties.password = User.encryptPassword(password))
  // should use req.body._id instead of id here
  User.findByIdAndUpdate((req.body._id || id), { $set: properties }, { new: true })
    .then((user) => {
      if (!user) res.status(404).send()
      else res.send(user)
    })
    .catch((error) => {console.log("returned error: ", error); res.status(500).send(error)}) // FIXME: 
})

app.delete('/users', authenticate, (req, res) => {
  const id = req.body._id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) res.status(400).send()
      else res.send(user)
    })
    .catch((error) => res.status(500).send(error))
})

app.post('/users/itineraries', authenticate, (req, res) => {
  const id = req.user._id
  if (!ObjectID.isValid(id)) res.status(404).send()
  const { events, date, location, name } = req.body.itinerary
  User.findByIdAndUpdate(id, { $push: { itineraries: { events, date, location, name } } }, { new: true })
    .then((user) => res.send(user))
    .catch((error) => res.status(500).send(error))
})

app.delete('/users/itineraries/:id', authenticate, (req, res) => {
  const userId = req.user._id
  const itineraryId = req.params.id
  if (!ObjectID.isValid(itineraryId)) {
    return res.status(404).send()
  }

  User.findByIdAndUpdate(userId, { $pull: { itineraries: { _id: itineraryId } } }, { new: true })
    .then((user) => res.send(user))
    .catch((error) => res.status(500).send(error))
})

app.patch('/users/itineraries/:id', authenticate, (req, res) => {
  const userId = req.user._id
  const itineraryId = req.params.id
  if (!ObjectID.isValid(itineraryId)) {
    return res.status(404).send()
  }
  const update = {
    'itineraries.$.events': req.body.events,
    'itineraries.$.name': req.body.name
  }
  !req.body.events && delete update['itineraries.$.events']
  !req.body.name && delete update['itineraries.$.name']
  User.findOneAndUpdate({ '_id': userId, 'itineraries._id': itineraryId }, { $set: update }, { new: true })
    .then((user) => {
      !user && res.status(404).send()
      res.send(user)
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
      res.send(user)
    })
    .catch((error) => {
      if (error.message.includes('404')) res.status(404).send(error)
      else if (error.message.includes('403')) res.status(403).send(error)
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
