const express = require('express')
const router = express.Router()
const User = require('../../models/User')

router.get('/', (req, res) => {
  User.find().then(users => res.json(users)).catch(err => res.json(err))
})

router.get('/:userId', (req, res) => {
  User.findById(req.params.userId).then(user => res.json(user)).catch(err => res.json(err))
})

router.post('/', (req, res) => {
  const newUser = new User({
    name: req.body.name
  })

  newUser.save().then(user => res.json(user)).catch(err => res.json(err))
})

module.exports = router
