const mongoose = require('mongoose');

const { Schema } = mongoose;

const IndustrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: null,
    },
    caseStudies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CaseStudy',
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    collection: 'industries',
    timestamps: true,
  },
);

module.exports = mongoose.model('Industry', IndustrySchema);
