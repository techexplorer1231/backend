const Category = require('../models/Category');

exports.paginateCategory = (req, res, next) => {
  Category.paginate(
    {},
    { offset: parseInt(req.params.page, 10), limit: parseInt(req.params.limit, 10) },
  )
    .then(categories => res.send(categories))
    .catch(err => next(err));
};

exports.listCategories = (req, res, next) => {
  Category.find({})
    .then(categories => res.send(categories))
    .catch(err => next(err));
};

exports.postCategory = (req, res, next) => {
  new Category(req.body)
    .save()
    .then(category => res.send(category))
    .catch(err => next(err));
};

exports.getCategory = (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => res.send(category))
    .catch(err => next(err));
};
