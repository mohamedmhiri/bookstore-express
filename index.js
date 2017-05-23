// Get dependencies
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
/* const passport = require('passport')
const Auth0Strategy = require('passport-auth0')*/
mongoose.Promise = Promise
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)


// mongoose.connect('mongodb://localhost:27017/data2')
const autoIncrement = require('mongoose-auto-increment')
const connection = mongoose.connect('mongodb://root:root@ds133221.mlab.com:33221/bookstore-database')
autoIncrement.initialize(connection)

const app = express()


app.use(cookieParser())
app.use(session({
  secret: 'mySecret',
  resave: false, // 1(false,true)
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000, secure: false, httpOnly: true }
}))
/*// Configure Passport to use Auth0
const strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
  return done(null, profile)
})

passport.use(strategy)

// This can be used to keep a smaller payload
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})*/
//app.use(require('cors')())
// Parsers for POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
  'http://localhost:4200'//,      //this is my front-end url for development
  // 'http://www.myproductionurl.com'
]
let corsOptions = {
  origin: (origin, callback) => {
    let isWhitelisted = originsWhitelist.indexOf(origin) !== -1
    callback(null, isWhitelisted)
  },
  credentials: true
}
//here is the magic
app.use(cors(corsOptions))
// Cross Origin middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin) //<-- you can change this with a specific url like http://localhost:4200
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,X-HTTP-Method-Override,application/json')
  next()
})
// Set our api routes
// app.use('/api', api)
app.use('/api', require('./lib/routes/book'))
app.use('/api', require('./lib/routes/client'))
app.use('/api', require('./lib/routes/category'))
app.use('/api', require('./lib/routes/cart'))
app.use('/api', require('./lib/routes/command'))
app.use('/api', require('./lib/routes/feed'))

app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000'
app.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Book Store API running on localhost:${port}`))
//module.exports = () => 'Peace be upon you :D'
