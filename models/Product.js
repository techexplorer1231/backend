const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    sku: String,
    description: String,
    manage_stock: Boolean,
    price: [
      {
        amount: String,
        currency: String,
        includes_tax: Boolean,
      },
    ],
    status: {
      type: { type: String, enum: ['draft', 'live'] },
    },
    commodity_type: {
      type: { type: String, enum: ['physical', 'digital'] },
    },
    dimensions: [
      {
        measurement: { type: String, enum: ['length', 'width', 'height'] },
        unit: String,
        value: String,
      },
    ],
    weight: {
      unit: { type: String, enum: ['g', 'kg', 'lb', 'oz'] },
      value: String,
    },
    meta: {
      stock: {
        level: Number,
        availability: String,
      },
    },
    relationships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  },
  { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
