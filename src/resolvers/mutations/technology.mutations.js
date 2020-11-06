const { ApolloError } = require('apollo-server-express');

const Technology = require('../../../models/Technology');

module.exports = {
  TechnologyMutation: {
    async create(parent, args) {
      try {
        const item = await Technology.create(args.input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async delete(parent, { id }) {
      try {
        await Technology.findByIdAndDelete(id);
        return id;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async update(parent, args) {
      try {
        const { id } = args;
        const item = await Technology.findByIdAndUpdate(id, args.input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
  },
};
