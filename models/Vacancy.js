const mongoose = require('mongoose');

const { Schema } = mongoose;

const VacancySchema = new Schema(
  {
    name: {
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
    location: {
      type: String,
      required: true,
      default: 'UA',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isHot: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'vacancies',
    timestamps: true,
  },
);

module.exports = mongoose.model('Vacancy', VacancySchema);
