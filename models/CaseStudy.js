const mongoose = require('mongoose');

const { Schema } = mongoose;

const CaseStudySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    imageURL: {
      type: String,
      default: null,
    },
    postedAt: {
      type: Date,
      default: null,
    },
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Technology',
      },
    ],
    industries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Industry',
      },
    ],
  },
  {
    collection: 'case_studies',
    timestamps: true,
  },
);

module.exports = mongoose.model('CaseStudy', CaseStudySchema);
