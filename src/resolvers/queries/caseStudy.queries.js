const { ApolloError } = require('apollo-server-express');

const CaseStudy = require('../../../models/CaseStudy');
const paginationBuilder = require('../helpers/pagination');
const parseSort = require('../helpers/parseSorting');
const Technology = require('../../../models/Technology');

module.exports = {
  caseStudy: async (parent, { id }) => {
    try {
      const item = await CaseStudy.findById(id);
      return item;
    } catch (err) {
      return new ApolloError(err.message);
    }
  },

  caseStudies: async (parent, args) => {
    const { page, limit, filter, sort } = args.input;

    /** Get Skip */
    const skip = (page - 1) * limit;
    /** Prepare Response */
    const response = {};
    /** Get Sorting */
    const [sortField, sortOrder] = parseSort(sort);

    try {
      const items = await CaseStudy.find(filter)
        .sort({ [sortField]: sortOrder })
        .limit(limit)
        .skip(skip);
      const totalItems = await CaseStudy.countDocuments();

      const pagination = paginationBuilder(totalItems, limit, page);

      response.items = items;
      response.pagination = pagination;
    } catch (err) {
      return new ApolloError(err.message);
    }

    return response;
  },
};
