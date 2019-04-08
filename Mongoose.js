const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_URI || 'mongodb+srv://dev:devpassword@cluster0-jdhti.mongodb.net/test?retryWrites=true'
mongoose.connect(connectionString, { useNewUrlParser: true })
module.exports = { mongoose }
