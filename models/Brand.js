const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const slug = require('slug');

const brandSchema = new mongoose.Schema(
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
brandSchema.pre('save', function(next) {
  this.slug = slug(this.name);
  next();
});
/* eslint-enable */

brandSchema.plugin(mongoosePaginate);
const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
