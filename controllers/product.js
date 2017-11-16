const Product = require('../models/Product');

exports.getProducts = (req, res, next) => {
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
