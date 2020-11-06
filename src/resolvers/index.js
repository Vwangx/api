const { GraphQLUpload } = require('graphql-upload');

const Mutation = require('./mutations');
const Query = require('./queries');
const MutationType = require('./mutation.types');
const QueryType = require('./query.types');

module.exports = {
  Upload: GraphQLUpload,
  Query,
  Mutation,
  ...QueryType,
  ...MutationType,
};
