/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4 } = require('uuid');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schemas');

/**
 * Multer configuration
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename(req, file, cb) {
    cb(null, `${v4()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const fileController = require('./controllers/file');
const productController = require('./controllers/product');
const categoryController = require('./controllers/category');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, { useMongoClient: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * graphql routes
 */
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

/**
 * Primary app routes.
 */
app.post('/api/upload', upload.single('avatar'), fileController.postFileUpload);

/**
 * Product routes.
 */
app
  .route('/api/products')
  .get(productController.listProducts)
  .post(productController.postProduct);

app.get('/api/products/:id', productController.getProduct);
app.get('/api/products/:page/:limit', productController.paginateProduct);

/**
 * Category routes.
 */
app
  .route('/api/categories')
  .get(categoryController.listCategories)
  .post(categoryController.postCategory);

app.get('/api/categories/:id', categoryController.getCategory);
app.get('/api/categories/:page/:limit', categoryController.paginateCategory);

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env'),
  );
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
