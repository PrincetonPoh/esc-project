const knex = require("knex");
const config = require("./knexfile")

// //// setup dummy db
// let db = null
// if (process.env.NODE_ENV === "test") {
//   db = knex(config.test)
// } else {
//   db = knex(config.development)
// }

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "escData.sqlite3"
    },
    useNullAsDefault: true
});

const path = require("path")

module.exports = {
    connectedKnex,
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

module.exports = connectedKnex;
// module.exports = db;