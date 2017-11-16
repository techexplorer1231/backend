const faker = require('faker');
const chalk = require('chalk');
const Category = require('../models/Category');

exports.addCategories = async () => {
  // Perform data seeding

  // Create an empty array that will be used in async.each
  console.log('%s Removed categories.', chalk.red('✗'));
  await Category.remove({});

  console.log('start inserting 1000 categories');
  const categories = [];

  for (let i = 0; i < 1000; i++) {
    const category = new Category({
      name: faker.commerce.productName(),
      slug: faker.lorem.slug(),
      description: faker.lorem.sentences(),
      status: faker.random.arrayElement(['draft', 'live']),
    });
    // Add the newly created category to the categories array
    categories.push(category);
  }

  await Category.create(categories);
  console.log('%s 1000 categories added.', chalk.green('✓'));
};
