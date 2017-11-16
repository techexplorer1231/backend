const Brand = require('../models/Brand');

exports.paginateBrand = (req, res, next) => {
  Brand.paginate(
    {},
    { offset: parseInt(req.params.page, 10), limit: parseInt(req.params.limit, 10) },
  )
    .then(brands => res.send(brands))
    .catch(err => next(err));
};

exports.listBrands = (req, res, next) => {
  Brand.find({})
    .then(brands => res.send(brands))
    .catch(err => next(err));
};

exports.postBrand = (req, res, next) => {
  new Brand(req.body)
    .save()
    .then(brand => res.send(brand))
    .catch(err => next(err));
};

exports.getBrand = (req, res, next) => {
  Brand.findById(req.params.id)
    .then(brand => res.send(brand))
    .catch(err => next(err));
};
