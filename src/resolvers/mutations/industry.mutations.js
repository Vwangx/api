const { ApolloError } = require('apollo-server-express');

const Industry = require('../../../models/Industry');

module.exports = {
  IndustryMutation: {
    async create(parent, args) {
      try {
        const item = await Industry.create(args.input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async delete(parent, { id }) {
      try {
        await Industry.findByIdAndDelete(id);
        return id;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async update(parent, args) {
      try {
        const { id } = args;
        const item = await Industry.findByIdAndUpdate(id, args.input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
  },
};
