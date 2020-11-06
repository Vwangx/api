const User = require('./queryTypes/user.type');
const CaseStudy = require('./queryTypes/caseStudy.type');
const Post = require('./queryTypes/post.type');
const Technology = require('./queryTypes/technology.type');
const Industry = require('./queryTypes/industry.type');

module.exports = {
  ...User,
  ...CaseStudy,
  ...Post,
  ...Technology,
  ...Industry,
};
