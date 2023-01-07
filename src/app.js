const express = require("express")
const bodyParser = require("body-parser")

// IMPORT ROUTES
const v1Post = require("./routes/api/v1/post")
const v1Get = require("./routes/api/v1/get")

const app = express()

// USE MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// USE ROUTES
app.use("/api/v1", v1Post)
app.use("/api/v1", v1Get)

module.exports = app
