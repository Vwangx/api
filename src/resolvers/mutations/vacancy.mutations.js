const { ApolloError } = require('apollo-server-express');

const Vacancy = require('../../../models/Vacancy');

module.exports = {
  VacancyMutation: {
    async create(parent, args) {
      try {
        const item = await Vacancy.create(args.input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async delete(parent, { id }) {
      try {
        await Vacancy.findByIdAndDelete(id);
        return id;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async update(parent, args) {
      try {
        const { id } = args;
        const item = await Vacancy.findByIdAndUpdate(id, args.input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
  },
};
