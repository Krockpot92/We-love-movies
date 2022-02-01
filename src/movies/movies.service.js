const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("movies").select(
    "movie_id as id",
    "title",
    "runtime_in_minutes",
    "rating",
    "description",
    "image_url"
  );
}

function isShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select(
      "m.movie_id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url",
    )   
    .groupBy("m.movie_id")
    .where({ is_showing: true })
}

function read(movieId) {
  return knex("movies")
    .select(
      "movie_id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url",
      "updated_at",
      "created_at"
    )
    .where({ movie_id: movieId })
    .first();
}

function playingAt(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select(
      "t.theater_id",
      "name",
      "address_line_1",
      "address_line_2",
      "city",
      "state",
      "zip",
      "t.created_at",
      "t.updated_at",
      "is_showing",
      "m.movie_id"
    )
    .where({ "m.movie_id": movieId });
}

const addCritic = mapProperties({
     preferred_name: "critic.preferred_name",
     surname: "critic.surname",
     organization_name:"critic.organization_name"
   });


function movieReview(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select(
      "r.*","c.*"
    )
    .where({ "r.movie_id": movieId })
    .then(data => data.map(addCritic))
    
}

module.exports = {
  list,
  read,
  playingAt,
  movieReview,
  isShowing
};
