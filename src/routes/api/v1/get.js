const express = require("express")
const Article = require("../../../models/Article")
const router = express.Router()

// @route  GET /api/v1/article
// @desc   list of articles with pagination and filter
// @access public
router.get("/article", async (req, res) => {
  const { limit, page, tag, type, minPrice, maxPrice, search } = req.query

  // ENSURE MIN QUERY ARE DEFINED
  if (!Number.isInteger(parseInt(page)) || !Number.isInteger(parseInt(limit))) {
    return res.status(400).json({ error: "limit or page query cannot be empty" })
  }

  // DEFINE AGGREGATE
  const aggregatePipelines = [
    {
      $match: {
        type: !type ? { $ne: [type] } : { $in: [type] },
        tags: !tag ? { $ne: [tag] } : { $in: [tag] },
        price: { $gt: !minPrice ? 0 : Number(minPrice), $lt: !maxPrice ? Infinity : Number(maxPrice) },
        name: !search ? { $ne: [search] } : { $regex: new RegExp(search, "i") }
      }
    },
    {
      $project: {
        _id: true,
        name: true,
        tags: true,
        type: true,
        price: true
      }
    },
    {
      $facet: {
        articles: [{ $skip: Number(page) * Number(limit) }, { $limit: Number(limit) }],
        total: [{ $count: "count" }]
      }
    }
  ]

  try {
    const articles = await Article.aggregate(aggregatePipelines)
    res.status(200).json(articles)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: `something unexpected happen, ${e}` })
  }
})

// @route  GET /api/v1/tags
// @desc   list of tags
// @access public
router.get("/tags", async (req, res) => {
  const aggregatePipelines = [
    {
      $project: {
        tags: true
      }
    },
    { $unwind: "$tags" },
    {
      $group: {
        _id: null,
        tags: { $addToSet: "$tags" }
      }
    }
  ]

  try {
    const tags = await Article.aggregate(aggregatePipelines)
    res.status(200).json(tags)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: `something unexpected happen, ${e}` })
  }
})

module.exports = router
