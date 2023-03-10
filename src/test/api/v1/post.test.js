const request = require("supertest")
const app = require("../../../app")

it("return 200 on successful post", async () => {
  const article = global.articleBuilder()
  const { body } = await request(app).post("/api/v1/article").send(article).expect(201)

  expect(body.name).toEqual(article.name)
  expect(body.price).toEqual(article.price)
  expect(body.type).toEqual(article.type)
  expect(body.picture).toEqual(article.picture)
})
