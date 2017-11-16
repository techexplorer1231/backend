const Product = require('../models/Product');

exports.paginateProduct = (req, res, next) => {
  Product.paginate(
    {},
    { offset: parseInt(req.params.page, 10), limit: parseInt(req.params.limit, 10) },
  )
    .then(products => res.send(products))
    .catch(err => next(err));
};

exports.listProducts = (req, res, next) => {
  Product.find({})
    .then(products => res.send(products))
    .catch(err => next(err));
};

exports.postProduct = (req, res, next) => {
  new Product(req.body)
    .save()
    .then(product => res.send(product))
    .catch(err => next(err));
};

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.send(product))
    .catch(err => next(err));
};
