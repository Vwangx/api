/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const { ApolloError, AuthenticationError } = require('apollo-server-express');

const User = require('../../../models/User');
const Post = require('../../../models/Post');

const { JWT_SECRET } = process.env;

const uploadFile = require('../helpers/uploadFile');
const removeFile = require('../helpers/removeFile');

module.exports = {
  UserMutation: {
    async login(parent, { input: { email, password } }) {
      try {
        const user = await User.findOne({ email });
        if (user) {
          const match = await user.validatePassword(password);
          if (match) {
            const token = await jwt.sign({ data: user._id }, JWT_SECRET, { expiresIn: '7d' });
            return { user, token };
          }
          return new AuthenticationError("Can't find user with this creditionals");
        }
        return new AuthenticationError("Can't find user with this creditionals");
      } catch (err) {
        return new AuthenticationError(err.message);
      }
    },

    async create(parent, { input }) {
      const { image } = input;
      if (image) {
        const uploadResponse = await uploadFile('images/users', image);
        input.avatarURL = uploadResponse.path;
      }

      try {
        const item = await User.create(input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async update(parent, { id, input }) {
      const { image } = input;
      if (image) {
        const item = await User.findById(id);
        await removeFile(item.avatarURL);
        const uploadResponse = await uploadFile('images/users', image);
        input.avatarURL = uploadResponse.path;
      }

      try {
        const item = await User.findByIdAndUpdate(id, input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async delete(parent, { id }) {
      try {
        await User.findByIdAndRemove(id);
        return id;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async renewToken(parent, args, { user }) {
      if (!user) return new AuthenticationError('You have not already authenticated');
      const token = await jwt.sign({ data: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return { user, token };
    },

    async currentUserUpdate(parent, { input }, { user: { id } }) {
      if (!id) return new AuthenticationError('You have not already authenticated');

      const { image } = input;
      if (image) {
        const item = await User.findById(id);
        await removeFile(item.avatarURL);
        const uploadResponse = await uploadFile('images/users', image);
        input.avatarURL = uploadResponse.path;
      }

      try {
        const item = await User.findByIdAndUpdate(id, input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
  },
};
