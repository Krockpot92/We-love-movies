const service = require("./reviews.service");

function list(req, res, next) {
  service
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

function reviewExists(req, res, next) {
  service
    .read(req.params.reviewId)
    .then((review) => {
      if (review) {
        res.locals.review = review;
        return next();
      }
      next({ status: 404, message: `Review cannot be found.` });
    })
    .catch(next);
}

function read(req, res) {
  const { review: data } = res.locals;
  res.json({ data });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await service.destroy(review.review_id);
  res.sendStatus(204);
}

// const VALID_PROPERTIES = ["content", "score", "movie_id", "critic_id"];

// function hasOnlyValidProperties(req, res, next) {
//   const { data = {} } = req.body;

//   const invalidFields = Object.keys(data).filter(
//     (field) => !VALID_PROPERTIES.includes(field)
//   );

//   if (invalidFields.length) {
//     return next({
//       status: 400,
//       message: `Invalid field(s): ${invalidFields.join(", ")}`,
//     });
//   }
//   next();
// }

function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  service
    .update(updatedReview)
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
  read: [reviewExists, read],
  delete: [reviewExists, destroy],
  update: [reviewExists, update],
};
