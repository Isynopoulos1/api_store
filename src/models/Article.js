const mongoose = require("mongoose")
const { Schema } = mongoose

const ArticleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Article = mongoose.model("articles", ArticleSchema)
