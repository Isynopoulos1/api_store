const mongoose = require("mongoose")
const dbHandler = require("./dbHandler")
const { faker } = require("@faker-js/faker")

beforeAll(async () => await dbHandler.connect())
beforeEach(async () => await dbHandler.clearDatabase())
afterAll(async () => await dbHandler.closeDatabase())

// FAKER FONCTIONS
const arrayBuilder = (array) => {
  let randNumb = Math.floor((Math.random() * 10) % 2)
  const randField = (items) => items[~~(items.length * Math.random())]
  if (randNumb === 0) {
    randNumb = 4
  }
  const arrayfields = [...Array(randNumb).keys()].slice(0).map((n) => randField(array))
  return arrayfields
}
const fieldBuilder = (array) => {
  return array[~~(array.length * Math.random())]
}

global.articleBuilder = () => {
  return {
    name: faker.commerce.product(),
    price: Number(faker.commerce.price()),
    type: fieldBuilder(["BUY", "SELL"]),
    picture: faker.image.business(),
    tags: [...new Set(arrayBuilder(["work", "lifestyle", "motor", "mobile"]))]
  }
}
