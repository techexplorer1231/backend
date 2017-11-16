const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const slug = require('slug');

const collectionSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    slug: String,
    status: String,
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  },
  { timestamps: true },
);

/* eslint-disable */
collectionSchema.pre('save', function(next) {
  this.slug = slug(this.name);
  next();
});
/* eslint-enable */

collectionSchema.plugin(mongoosePaginate);
const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;
