const express = require("express")

const router = express.Router()

// @route  PUT /api/v1/article
// @desc   Create an article
// @access public
router.put("/article", async (req, res) => {
  res.send("hello world")
})

module.exports = router
