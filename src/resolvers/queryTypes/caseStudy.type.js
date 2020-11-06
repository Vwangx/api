const { ApolloError } = require('apollo-server-express');

const CaseStudy = require('../../../models/CaseStudy');

module.exports = {
  CaseStudy: {
    async technologies(parent, args, { user }) {
      try {
        const { technologies: items } = await CaseStudy.findById(parent._id).populate('technologies');
        return items;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async industries(parent, args, { user }) {
      try {
        const { industries: items } = await CaseStudy.findById(parent._id).populate('industries');
        return items;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
  },
};
