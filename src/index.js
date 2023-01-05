const app = require("./app")
const mongo = require("./services/mongo")

// CONNECT DATABASE
mongo("api_store")

// LISTEN SERVER
app.listen(3000, () => {
  console.log("api_store listening on port 3000")
})
