const { ApolloError } = require('apollo-server-express');

const User = require('../../../models/User');
const paginationBuilder = require('../helpers/pagination');
const parseSort = require('../helpers/parseSorting');
const s3GetSignedUrls = require('../helpers/s3GetSignedUrls');

module.exports = {
  currentUser: (parent, args, { user }) => user,
  users: async (parent, args, { user }) => {
    const { page, limit, filter, sort } = args.input;

    /** Get Skip */
    const skip = (page - 1) * limit;
    /** Prepare Response */
    const response = {};
    /** Get Sorting */
    const [sortField, sortOrder] = parseSort(sort);
    try {
      let items = await User.find(filter)
        .sort({ [sortField]: sortOrder })
        .limit(limit)
        .skip(skip)
        .where({ email: { $ne: user.email } });

      items = s3GetSignedUrls(items, ['avatarURL']);

      const totalItems = await User.countDocuments();

      const pagination = paginationBuilder(totalItems, limit, page);

      response.items = items;
      response.pagination = pagination;
    } catch (err) {
      return new ApolloError(err.message);
    }

    return response;
  },
  user: async (parent, { id }) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      return new ApolloError(err.message);
    }
  },
};
