const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  posts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "post"
      }
    }
  ]
})

module.exports = User = mongoose.model("user", UserSchema)
