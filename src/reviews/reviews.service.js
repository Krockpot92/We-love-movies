const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("reviews").select("*");
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function readReaviewAndCritic(review_id) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select()
    .where({ review_id })
    .first()
}

function update(updatedReview) {
  return knex("reviews as r")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() => readReaviewAndCritic(updatedReview.review_id))
    .then(addCritic)
}

module.exports = {
  list,
  destroy,
  read,
  update,
};
