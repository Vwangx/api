const userQueries = require('./queries/user.queries');
const postQueries = require('./queries/post.queries');
const officeQueries = require('./queries/office.queries');
const vacancyQueries = require('./queries/vacancy.queries');
const clientQueries = require('./queries/client.queries');
const requestQueries = require('./queries/request.queries');
const technologyQueryies = require('./queries/technology.queries');
const caseStudyQueries = require('./queries/caseStudy.queries');
const industryQueries = require('./queries/industry.queries');
const vacancyRequestQueries = require('./queries/vacancyRequest.queries');

module.exports = {
  ...userQueries,
  ...postQueries,
  ...officeQueries,
  ...vacancyQueries,
  ...clientQueries,
  ...requestQueries,
  ...technologyQueryies,
  ...caseStudyQueries,
  ...industryQueries,
  ...vacancyRequestQueries,
};
