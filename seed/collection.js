const faker = require('faker');
const chalk = require('chalk');
const Collection = require('../models/Collection');

exports.addCollections = async () => {
  // Perform data seeding

  // Create an empty array that will be used in async.each
  console.log('%s Removed collections.', chalk.red('✗'));
  await Collection.remove({});

  console.log('start inserting 1000 collections');
  const collections = [];

  for (let i = 0; i < 1000; i++) {
    const collection = new Collection({
      name: faker.commerce.productName(),
      slug: faker.lorem.slug(),
      description: faker.lorem.sentences(),
      status: faker.random.arrayElement(['draft', 'live']),
      files: ['5a0d3dc1adbc543c982c72de', '5a0d404d07559845920f3d53'],
    });
    // Add the newly created collection to the collections array
    collections.push(collection);
  }

  await Collection.create(collections);
  console.log('%s 1000 collections added.', chalk.green('✓'));
};
