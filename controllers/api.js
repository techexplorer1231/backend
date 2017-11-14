/**
 * POST /api/upload
 * File Upload API example.
 */

exports.postFileUpload = (req, res) => {
  res.send(req.file);
};
