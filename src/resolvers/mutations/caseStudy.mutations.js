const { ApolloError } = require('apollo-server-express');

const CaseStudy = require('../../../models/CaseStudy');

module.exports = {
  CaseStudyMutation: {
    async create(parent, { input }) {
      try {
        const item = await CaseStudy.create(input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async delete(parent, { id }) {
      try {
        await CaseStudy.findByIdAndDelete(id);
        return id;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async update(parent, { id, input }) {
      try {
        const item = await CaseStudy.findByIdAndUpdate(id, input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async addIndustryAndTechnologyToCaseStudy (parent, { id, industries, technologies }) {
      try {
          const item = await CaseStudy.findByIdAndUpdate(id, { $addToSet: { industries, technologies }, } );
          return item;
      } catch (err) {
          return new ApolloError(err.message);
      }
    },
  },
};
