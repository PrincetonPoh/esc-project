const db = require("./knex")

beforeAll(async () => {
  // run the migrations and do any other setup here
  await db.migrate.latest()
})

test("select users", async () => {
//   let users = await db.from("users").select("*")
  let users = await db("users").select("*")
  expect(users.length).toEqual(0)
})