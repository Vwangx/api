const { ApolloError } = require('apollo-server-express');

const Technology = require('../../../models/Technology');

module.exports = {
  Technology: {
    async caseStudies(parent, args, { user }) {
      try {
        const { caseStudies: items } = await Technology.findById(parent._id).populate('caseStudies');
        return items;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async posts(parent, args, { user }) {
        try {
            const { posts: items } = await Technology.findById(parent._id).populate('posts')
            return items;
        } catch (err) {
            return new ApolloError(err.message)
        }
    }
  },
};
