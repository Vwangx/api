const { ApolloError } = require('apollo-server-express');

const s3 = require('../../../services/s3');

module.exports = async (path = null) => {
  if (path) {
    const params = {
      Bucket: 'mbunity-development',
      Key: path,
    };

    try {
      return s3.deleteObject(params).promise();
    } catch (err) {
      return new ApolloError(err.message);
    }
  }
  return null;
};
