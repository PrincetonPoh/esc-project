// Update with your config settings.
const path = require("path")

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "escData.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: ("../")
      // directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds")
    }
  },

  test: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "seeds")
    }
  },

}