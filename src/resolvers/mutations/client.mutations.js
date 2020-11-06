const { ApolloError } = require('apollo-server-express');

const Client = require('../../../models/Client');

module.exports = {
  ClientMutation: {
    async create(parent, args) {
      try {
        const item = await Client.create(args.input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async delete(parent, { id }) {
      try {
        id.forEach(async (item) => {
          await Client.findByIdAndDelete(item);
        });
        return id;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async update(parent, args) {
      try {
        const { id } = args;
        const item = await Client.findByIdAndUpdate(id, args.input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
  },
};
