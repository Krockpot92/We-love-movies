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
      next({ status: 404, message: `review cannot be found.` });
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

function update(req, res, next) {
  const updatedreview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  service
    .update(updatedreview)
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
  read: [reviewExists, read],
  delete: [reviewExists, destroy],
  update: [reviewExists, update],
};
