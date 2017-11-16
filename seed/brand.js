const faker = require('faker');
const chalk = require('chalk');
const Brand = require('../models/Brand');

exports.addBrands = async () => {
  // Perform data seeding

  // Create an empty array that will be used in async.each
  console.log('%s Removed brands.', chalk.red('✗'));
  await Brand.remove({});

  console.log('start inserting 1000 brands');
  const brands = [];

  for (let i = 0; i < 1000; i++) {
    const brand = new Brand({
      name: faker.commerce.productName(),
      slug: faker.lorem.slug(),
      description: faker.lorem.sentences(),
      status: faker.random.arrayElement(['draft', 'live']),
      files: ['5a0d3dc1adbc543c982c72de', '5a0d404d07559845920f3d53', '5a0db68e026a667abfb567a1'],
    });
    // Add the newly created brand to the brands array
    brands.push(brand);
  }

  await Brand.create(brands);
  console.log('%s 1000 brands added.', chalk.green('✓'));
};
