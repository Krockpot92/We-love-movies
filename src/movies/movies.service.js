const knex = require("../db/connection");
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

function read(movieId) {
  return knex("movies")
    .select(
      "movie_id as id",
      "title",
      "runtime_in_minutes",
      "rating",
      "description",
      "image_url"
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
      "m.movie_id",
    )
    .where({ "m.movie_id": movieId })
}


function movieReview(movieId) {
  return knex("movies as m")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select(
      "r.review_id",
      "content",
      "score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "m.movie_id", 
    )
    .where({ "m.movie_id": movieId })
}




module.exports = {
  list,
  read,
  playingAt,
  movieReview,
};
