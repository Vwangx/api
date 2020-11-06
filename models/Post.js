const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      retuired: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      default: null,
    },
    postedAt: {
      type: Date,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    industries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Industry',
      },
    ],
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Technology',
      },
    ],
  },
  {
    collection: 'posts',
    timestamps: true,
  },
);

module.exports = mongoose.model('Post', PostSchema);
