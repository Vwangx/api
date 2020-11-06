const { ApolloError } = require('apollo-server-express');

const Post = require('../../../models/Post');

module.exports = {
  Post: {
    async user(parent) {
      try {
        const { user: item } = await Post.findById(parent._id).populate('user');
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
    async industries(parent) {
      try {
        const { industries: items } = await Post.findById(parent._id).populate('industries');
        return items;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
    async technologies(parent) {
      try {
        const { technologies: items } = await Post.findById(parent._id).populate('technologies');
        return items;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
  },
};
