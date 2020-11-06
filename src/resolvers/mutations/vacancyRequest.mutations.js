const { ApolloError } = require('apollo-server-express');
const VacancyRequest = require('../../../models/VacancyRequest');

module.exports = {
  VacancyRequestMutation: {
    async create(parent, args) {
      try {
        const item = await VacancyRequest.create(args.input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
    async delete(parent, { id }) {
      try {
        await VacancyRequest.findByIdAndDelete(id);
        return id;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
    async update(parent, { id, input }) {
      try {
        const item = await VacancyRequest.findByIdAndUpdate(id, input);
        return item;
      } catch (err) {
        return new ApolloError(err);
      }
    },
  },
};
