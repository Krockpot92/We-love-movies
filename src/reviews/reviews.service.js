const knex = require("../db/connection");

function list() {
  return knex("reviews").select("*");
}

function destroy(restaurant_id) {
  return knex(tableName).where({ restaurant_id }).del();
}


module.exports = {
    list,
  };
  