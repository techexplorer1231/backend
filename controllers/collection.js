const Collection = require('../models/Collection');

exports.paginateCollection = (req, res, next) => {
  Collection.paginate(
    {},
    { offset: parseInt(req.params.page, 10), limit: parseInt(req.params.limit, 10) },
  )
    .then(collections => res.send(collections))
    .catch(err => next(err));
};

exports.listCollections = (req, res, next) => {
  Collection.find({})
    .then(collections => res.send(collections))
    .catch(err => next(err));
};

exports.postCollection = (req, res, next) => {
  new Collection(req.body)
    .save()
    .then(collection => res.send(collection))
    .catch(err => next(err));
};

exports.getCollection = (req, res, next) => {
  Collection.findById(req.params.id)
    .then(collection => res.send(collection))
    .catch(err => next(err));
};
