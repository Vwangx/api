const { ApolloError } = require('apollo-server-express');

const Client = require('../../../models/Client');
const paginationBuilder = require('../helpers/pagination');
const parseSort = require('../helpers/parseSorting');

module.exports = {
  client: async (parent, { id }) => {
    try {
      const item = await Client.findById(id);
      return item;
    } catch (err) {
      return new ApolloError(err.message);
    }
  },

  clients: async (parent, args) => {
    const { page, limit, filter, sort } = args.input;

    /** Get Skip */
    const skip = (page - 1) * limit;
    /** Prepare Response */
    const response = {};
    /** Get Sorting */
    const [sortField, sortOrder] = parseSort(sort);

    try {
      const items = await Client.find(filter)
        .sort({ [sortField]: sortOrder })
        .limit(limit)
        .skip(skip);
      const totalItems = await Client.countDocuments();

      const pagination = paginationBuilder(totalItems, limit, page);

      response.items = items;
      response.pagination = pagination;
    } catch (err) {
      return new ApolloError(err.message);
    }

    return response;
  },
};
