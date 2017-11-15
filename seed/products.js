const async = require('async');
const faker = require('faker');
const Product = require('../models/Product');

exports.addProducts = () => {
  // Perform data seeding
  // Create an empty array that will be used in async.each
  console.log('started inserting 1000 products');
  const products = [];

  // Create 1000 User mongoose objects
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
    });
    // Add the newly created product to the products array
    products.push(product);
  }

  async.each(
    // 1st parameter is the 'products' array to iterate over
    products,

    // 2nd parameter is a function takes each product in
    // the 'products' array as an argument and a callback
    // function that needs to be executed when the
    // asynchronous call completes
    (product, callback) => {
      // Call product.save which is asynchronous function
      product.save(() => {
        // The asyncrhonous DB save call is done,
        // execute callback function to alert
        // async.each to move on to the next product
        // object in the array
        callback();
      });
    },

    // 3rd parameter is a function to call when all
    // products in 'products' array have completed their
    // asynchronous product.save function
    () => {
      // All tasks complete
      console.log('Finished inserting 1000 products');
    },
  );
};
