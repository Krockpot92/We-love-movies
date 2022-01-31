const knex = require("../db/connection");

function list() {
  return knex("reviews").select("*");
}

function read(reviewId) {
    return knex("reviews")
      .select(
        "*"
      )
      .where({ review_id: reviewId })
      .first();
  }

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function update(updatedReview) {
    return knex("reviews")
      .select("*")
      .where({ review_id: updatedReview.review_id })
      .update(updatedSupplier, "*");
  }

module.exports = {
    list,
    destroy,
    read,
    update,
  };
  