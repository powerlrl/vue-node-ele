const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')


//引入路由
const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
// db config
const db = require('./config/keys.js').mongoURL


// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//use 路由
app.use('/api/users',users)
app.use('/api/profiles',profiles)
// db connect
mongoose.connect(db)
        .then(() => {
          console.log('mongo is connect')
        })
        .catch((err) => {
          console.log('err')
        })

// passport init
app.use(passport.initialize())
require('./config/passport.js')(passport)

const port = process.env.PORT || 5000
app.listen(port,() => {
  console.log(`server is running ${port}`)
})