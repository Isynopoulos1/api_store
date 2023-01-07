# API STORE

- INITIAL THOUGHTS
- INSTALLING AND DEPLOY LOCALLY
- API DOCUMENTATION

---

1. **INITIAL THOUGHTS**

This API have been built following the TTD pattern buy implementing real integration testing with a in memory mongo db test database, supertest and jest. Each endpoint have been thorowly tested for each of the required usecases.

The queries have been made mostly by using the aggregation from mongodb that let us solve the pagination and filter within a adequate way.

---

2. **INSTALLING AND DEPLOY LOCALLY**

create a keys_local.js file in the config folder where you remplace the `process.env.MONGO_URI` with the following string
`MONGO_URI=mongodb+srv://isela:alarcon@cluster0.ms0vk4k.mongodb.net/?retryWrites=true&w=majority`

install modules with `npm i` and then launch the integration tests with `npm test`
server can optionaly be launched locally with `npm run dev`

3. **API DOCUMENTATION**

the API is composed of 3 endpoint that are versioned and follow CRUD principles

- POST '/api/v1/article'
- GET '/api/v1/article'
- GET '/api/v1/tags'

---

POST '/api/v1/article' receive a `req.body` composed of:

```js
{
  name: "name to imput",
  price: 20 // price to imput,
  type: "BUY" // BUY or SELL,
  picture: "/some/pic/url",
  tags: ["work", "lifestyle", "motor", "mobile"]
}
```

---

GET '/api/v1/article' receive a `req.query` composed of:

- required `page` and `limit`
- optional `type`, `tags`, `minPrice`, `maxPrice` and `search`

---

GET '/api/v1/tags' just return the list of existant tags within the database
