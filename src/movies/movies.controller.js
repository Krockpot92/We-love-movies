const moviesService = require("./movies.service");

function list(req, res, next) {
  moviesService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
}

module.exports = {
  list,
};