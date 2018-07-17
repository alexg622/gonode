const express = require("express")
const router = express.Router()
const Post = require("../../models/Post")
const User = require('../../models/User')

router.get('/test', (req, res) => res.json({msg: "this works"}))

router.get('/', (req, res) => {
  Post.find().then(posts => res.json(posts)).catch(err => res.json(err))
})

router.get('/:postId', (req, res) => {

  Post.findById(req.params.postId).then(post => res.json(post)).catch(err => res.json(err))
})

router.post('/', (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author
  })

  newPost.save().then(post => {
    User.findById(post.author).then(user => {
      user.posts.unshift(post)
      user.save()
      res.json(user)
    })
  }).catch(err => res.json(err))

})

router.patch('/:postId', (req, res) => {
  Post.update({_id: req.params.postId}, {title: req.body.title, body: req.body.body})
    .then(() => res.json({msg: "Post was update"})).catch(err => res.json(err))
})

router.delete('/:postId', (req, res) => {
  Post.findById(req.params.postId).then(post => {
    post.remove().then(post => res.json(post)).catch(err => res.json(err))
  }).catch(err => res.json(err))
})

module.exports = router
