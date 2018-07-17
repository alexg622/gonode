const express = require('express')
const app = express()
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const posts = require('./routes/api/posts')
const db = require('./config/keys').mongoURI
const users = require('./routes/api/users')


mongoose.connect(db).then(() => console.log("mongoDB is connected")).catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/test', (req, res) => res.send("working"))

app.use('/api/posts', posts)
app.use('/api/users', users)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`listening on port ${port}`))
