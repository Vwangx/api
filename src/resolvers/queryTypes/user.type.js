const { ApolloError } = require('apollo-server-express');

const User = require('../../../models/User');

module.exports = {
  User: {
    async posts(parent) {
      try {
        const { posts: items } = await User.findById(parent._id).populate('posts');
        return items;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
  },
};
