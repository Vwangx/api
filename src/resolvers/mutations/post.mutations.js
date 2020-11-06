const { ApolloError } = require('apollo-server-express');
const { async } = require('crypto-random-string');

// const User = require('../../../models/User');
const Post = require('../../../models/Post');

module.exports = {
  PostMutation: {
    async create(parent, { input }) {
      try {
        const item = await Post.create(input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async update(parent, { id, input }) {
      try {
        const item = await Post.update(id, input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async delete(parent, { id }, { user }) {
      try {
        const post = await Post.findById(id).where('userId').equals(user._id);
        if (post) {
          await post.remove();
          return id;
        }
        return new ApolloError(`No such element with id: ${id}`);
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async changeUser(parent, { id, input }) {
      try {
        const item = await Post.findOneAndUpdate(id, input);
        return item;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },

    async removeUser(parent, { id }) {
      try {
        await Post.findByIdAndUpdate(id, { user: null });
        return id;
      } catch (err) {
        return new ApolloError(err.message);
      }
    },
    // Необходимо доработать!
    async changeIndustries(parent, { id, input }) {
      try {
        const item = await Post.findByIdAndUpdate(id, input);
        return item;
      } catch (err) {
        return new ApolloError(err);
      }
    },
    async removeOneIndustry(parent, { id, indusrtyId }) {
      try {
        const industryArray = await Post.findById(id, 'industries');
        if (industryArray !== null) {
          const filterIndustryArray = industryArray.industries.filter((item) => !indusrtyId.includes(item));
          await Post.findByIdAndUpdate(id, { industries: filterIndustryArray });
        } else {
          console.log('this element not found');
        }
        return id;
      } catch (err) {
        return new ApolloError(err);
      }
    },
  },
};
