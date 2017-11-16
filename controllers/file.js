const File = require('../models/File');

exports.postFileUpload = (req, res, next) => {
  new File({
    fieldname: req.file.fieldname,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    destination: req.file.destination,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
  })
    .save()
    .then(file => res.send(file))
    .catch(err => next(err));
};
