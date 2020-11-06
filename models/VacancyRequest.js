const mongoose = require('mongoose');

const { Schema } = mongoose;

const VacancyRequestSchema = new Schema(
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
      required: true,
    },
    cvURL: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'vacansy_requests',
    timestamps: true,
  },
);

module.exports = mongoose.model('VacancyRequest', VacancyRequestSchema);
