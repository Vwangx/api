const mongoose = require('mongoose');

const { Schema } = mongoose;

const TechnologySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
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
    collection: 'technologies',
    timestamps: true,
  },
);

module.exports = mongoose.model('Technology', TechnologySchema);
