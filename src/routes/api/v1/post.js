const express = require("express")
const Article = require("../../../models/Article")
const router = express.Router()

// @route  POST /api/v1/article
// @desc   Create an article
// @access public
router.post("/article", async (req, res) => {
  // EXTRACT VARIABLES
  const { name, price, picture, type, tags } = req.body

  // FORMAT FIELDS
  const articleFields = {
    name,
    type,
    price,
    picture,
    tags
  }

  try {
    const article = await new Article(articleFields).save()
    res.status(201).json(article)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: `something unexpected happen, ${e}` })
  }
})

module.exports = router
