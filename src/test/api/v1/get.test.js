const request = require("supertest")
const app = require("../../../app")

it("return 200 on successful get for 30 element with pagination of 10 elements", async () => {
  // GENERATE ARTICLES
  for (let i = 0; i < 30; i++) {
    const article = global.articleBuilder()
    await request(app).post("/api/v1/article").send(article).expect(201)
  }

  // FETCH ARTICLE LIST
  const { body: page1 } = await request(app).get("/api/v1/article?page=0&limit=10").expect(200)
  const { body: page2 } = await request(app).get("/api/v1/article?page=1&limit=10").expect(200)
  const { body: page3 } = await request(app).get("/api/v1/article?page=2&limit=10").expect(200)

  expect(page1[0].articles.length).toEqual(10)
  expect(page2[0].articles.length).toEqual(10)
  expect(page3[0].articles.length).toEqual(10)
})

it("return 200 on successful get for 30 element and seach element starting with ch", async () => {
  // GENERATE ARTICLES
  for (let i = 0; i < 30; i++) {
    const article = global.articleBuilder()
    await request(app).post("/api/v1/article").send(article).expect(201)
  }

  // FETCH ARTICLE LIST
  const search = "ch"
  const { body } = await request(app).get(`/api/v1/article?page=0&limit=10&search=${search}`).expect(200)
  const articles = body[0].articles
  for (let i = 0; i < articles.length; i++) {
    const initials = articles[i].name.substring(0, 2).toLowerCase()
    expect(initials).toEqual(search)
  }
})

it("return 200 on successful get for 30 element with max and min prices", async () => {
  // GENERATE ARTICLES
  for (let i = 0; i < 30; i++) {
    const article = global.articleBuilder()
    await request(app).post("/api/v1/article").send(article).expect(201)
  }

  // FETCH ARTICLE LIST
  const maxPrice = 200
  const minPrice = 10

  const { body } = await request(app).get(`/api/v1/article?page=0&limit=10&maxPrice=${maxPrice}&minPrice=${minPrice}`).expect(200)
  const articles = body[0].articles
  for (let i = 0; i < articles.length; i++) {
    const price = Number(articles[i].price)
    expect(price).toBeLessThan(maxPrice)
    expect(price).toBeGreaterThan(minPrice)
  }
})

it("return 200 on successful get for 30 element with tag filters", async () => {
  // GENERATE ARTICLES
  for (let i = 0; i < 30; i++) {
    const article = global.articleBuilder()
    await request(app).post("/api/v1/article").send(article).expect(201)
  }

  // FETCH ARTICLE LIST
  const tag = "motor"

  const { body } = await request(app).get(`/api/v1/article?page=0&limit=10&tag=${tag}`).expect(200)
  const articles = body[0].articles
  for (let i = 0; i < articles.length; i++) {
    const tags = articles[i].tags
    expect(tags).toContain(tag)
  }
})

it("return 200 on successful get for 30 element with type filters", async () => {
  // GENERATE ARTICLES
  for (let i = 0; i < 30; i++) {
    const article = global.articleBuilder()
    await request(app).post("/api/v1/article").send(article).expect(201)
  }

  // FETCH ARTICLE LIST
  const type = "BUY"

  const { body } = await request(app).get(`/api/v1/article?page=0&limit=10&type=${type}`).expect(200)
  const articles = body[0].articles
  for (let i = 0; i < articles.length; i++) {
    const type = articles[i].type
    expect(type).toEqual(type)
  }
})

it("return 200 on successful get for list of tags elements", async () => {
  // GENERATE ARTICLES
  const articles = []
  for (let i = 0; i < 5; i++) {
    const article = global.articleBuilder()
    articles.push(article)

    await request(app).post("/api/v1/article").send(article).expect(201)
  }

  const { body } = await request(app).get(`/api/v1/tags`).expect(200)
  const tags = body[0].tags
  for (let i = 0; i < articles.length; i++) {
    expect(tags).toContain(articles[i].tags[0])
  }
})
