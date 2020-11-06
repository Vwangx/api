const { ApolloError } = require('apollo-server-express');

const Office = require('../../../models/Office');

module.exports = {
  OfficeMutation: {
    async create(parent, args) {
      try {
        const { name, description, telephone, address, email } = args.input;
        const item = await Office.create({ name, description, telephone, address, email });
        return item;
      } catch (e) {
        return new ApolloError(e.message);
      }
    },
    async update(parent, { id, input }) {
      try {
        const item = await Office.findByIdAndUpdate(id, input);
        return item;
      } catch (e) {
        return new ApolloError(e.message);
      }
    },
    async delete(parent, { id }) {
      try {
        await Office.findByIdAndRemove(id);
        return id;
      } catch (e) {
        return new ApolloError(e.message);
      }
    },
  },
};
