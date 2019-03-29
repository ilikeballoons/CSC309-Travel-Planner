const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/TravelPlannerAPI'
mongoose.connect(connectionString, { useNewUrlParser: true })
module.exports = { mongoose }
