const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const slug = require('slug');

const categorySchema = new mongoose.Schema(
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
categorySchema.pre('save', function(next) {
  this.slug = slug(this.name);
  next();
});
/* eslint-enable */

categorySchema.plugin(mongoosePaginate);
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
