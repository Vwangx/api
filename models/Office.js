const mongoose = require('mongoose');

const { Schema } = mongoose;

const OfficeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'offices',
    timestamps: true,
  },
);

module.exports = mongoose.model('Office', OfficeSchema);
