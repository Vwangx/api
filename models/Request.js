const mongoose = require('mongoose');

const { Schema } = mongoose;

const RequestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    fileURL: {
      type: String,
      default: null,
    },
  },
  {
    collection: 'requests',
    timestamps: true,
  },
);

module.exports = mongoose.model('Request', RequestSchema);
