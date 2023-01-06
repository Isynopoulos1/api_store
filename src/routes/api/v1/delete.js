const express = require("express")

const router = express.Router()

// @route  DELETE /api/v1/article
// @desc   Create an article
// @access public
router.delete("/article", async (req, res) => {
  res.send("hello world")
})

module.exports = router
