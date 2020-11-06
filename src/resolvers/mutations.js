const cryptoRandomString = require('crypto-random-string');
const path = require('path');
const s3 = require('../../services/s3');

module.exports = {
  user: () => ({}),
  post: () => ({}),
  office: () => ({}),
  vacancy: () => ({}),
  client: () => ({}),
  request: () => ({}),
  technology: () => ({}),
  caseStudy: () => ({}),
  industry: () => ({}),
  vacancyRequest: () => ({}),
};
