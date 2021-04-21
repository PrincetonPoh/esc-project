const knex = require("knex");

exports.up = function(knex) {
    knex.schema
        .createTable("users", (table) => {
          table.increments("user_id")
          table.string("phoneNumber")
          table.string("userName")
          table.string("emailAddress")
          table.string("password")
        })
        .then(() => {
          console.log("created users")
        })
    };
  
exports.down = function(knex) {
    knex.schema.dropTable("users").then(() => {
        console.log("dropped users")
    })
};
  