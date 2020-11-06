const { ApolloError } = require('apollo-server-express');

const Request = require('../../../models/Request');
const paginationBuilder = require('../helpers/pagination');
const parseSort = require('../helpers/parseSorting');

module.exports = {
  request: async (parent, { id }) => {
    try {
      const item = await Request.findById(id);
      return item;
    } catch (err) {
      return new ApolloError(err.message);
    }
  },

  requests: async (parent, args) => {
    const { page, limit, filter, sort } = args.input;

    /** Get Skip */
    const skip = (page - 1) * limit;
    /** Prepare Response */
    const response = {};
    /** Get Sorting */
    const [sortField, sortOrder] = parseSort(sort);

    try {
      const items = await Request.find(filter)
        .sort({ [sortField]: sortOrder })
        .limit(limit)
        .skip(skip);
      const totalItems = await Request.countDocuments();

      const pagination = paginationBuilder(totalItems, limit, page);

      response.items = items;
      response.pagination = pagination;
    } catch (err) {
      return new ApolloError(err.message);
    }

    return response;
  },
};
