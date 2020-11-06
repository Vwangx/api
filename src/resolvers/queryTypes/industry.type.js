const { ApolloError } = require('apollo-server-express');

const Industry = require('../../../models/Industry');

module.exports = {
  Industry: {
    async caseStudies(parent, args, { user }) {
      try {
        const { caseStudies: items } = await Industry.findById(parent._id).populate('caseStudies');
        return items;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
    
    async posts(parent, args, { user }) {
        try {
            const { posts: items } = await Industry.findById(parent._id).populate('posts')
            return items;
        } catch (err) {
            return new ApolloError(err.message)
        }
    }
  },
};
