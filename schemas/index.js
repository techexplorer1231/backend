const { merge } = require('lodash');
const { makeExecutableSchema } = require('graphql-tools');
const { authorSchema, authorResolvers } = require('./author');

const typeDefs = [authorSchema];
const resolvers = merge(authorResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
