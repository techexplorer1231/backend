const faker = require('faker');
const chalk = require('chalk');
const Product = require('../models/Product');

exports.addProducts = async () => {
  // Perform data seeding

  // Create an empty array that will be used in async.each
  console.log('%s Removed products.', chalk.red('✗'));
  await Product.remove({});

  console.log('start inserting 1000 products');
  const products = [];

  for (let i = 0; i < 1000; i++) {
    const product = new Product({
      name: faker.commerce.productName(),
      slug: faker.lorem.slug(),
      sku: faker.random.uuid(),
      description: faker.lorem.sentences(),
      manage_stock: faker.random.boolean(),
      price: [
        {
          amount: faker.commerce.price(),
          currency: faker.finance.currencyCode(),
          includes_tax: faker.random.boolean(),
        },
      ],
      status: faker.random.arrayElement(['draft', 'live']),
      commodity_type: faker.random.arrayElement(['physical', 'digital']),
      dimensions: [
        {
          measurement: 'length',
          unit: 'cm',
          value: faker.random.number(),
        },
        {
          measurement: 'width',
          unit: 'cm',
          value: faker.random.number(),
        },
        {
          measurement: 'height',
          unit: 'cm',
          value: faker.random.number(),
        },
      ],
      weight: {
        unit: faker.random.arrayElement(['g', 'kg', 'lb', 'oz']),
        value: faker.random.number(),
      },
      meta: {
        stock: {
          level: faker.random.number(),
          availability: faker.random.arrayElement(['out-stock', 'in-stock']),
        },
      },
      files: ['5a0d3dc1adbc543c982c72de', '5a0d404d07559845920f3d53'],
    });
    // Add the newly created product to the products array
    products.push(product);
  }

  await Product.create(products);
  console.log('%s 1000 products added.', chalk.green('✓'));
};
