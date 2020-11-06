const { ApolloError } = require('apollo-server-express');
const Request = require('../../../models/Request');

module.exports = {
  RequestMutation: {
    async create(parent, args) {
      try {
        const item = await Request.create(args.input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
    async delete(parent, { id }) {
      try {
        await Request.findByIdAndDelete(id);
        return id;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
    async update(parent, { id, input }) {
      try {
        const item = await Request.findByIdAndUpdate(id, input);
        return item;
      } catch (err) {
        return new ApolloError(err);
      }
    },
  },
};
