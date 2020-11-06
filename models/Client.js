const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      default: null,
    },
    websiteURL: {
      type: String,
      default: null,
    },
  },
  {
    collection: 'clients',
    timestamps: true,
  },
);

module.exports = mongoose.model('Client', ClientSchema);
