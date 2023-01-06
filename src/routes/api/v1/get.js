const express = require("express")

const router = express.Router()

// @route  GET /api/v1/article
// @desc   Create an article
// @access public
router.get("/article", async (req, res) => {
  res.send("hello world")
})

module.exports = router
