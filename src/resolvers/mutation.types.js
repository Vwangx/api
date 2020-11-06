const UserMutation = require('./mutations/user.mutations');
const PostMutation = require('./mutations/post.mutations');
const OfficeMutation = require('./mutations/office.mutations');
const VacancyMutation = require('./mutations/vacancy.mutations');
const ClientMutation = require('./mutations/client.mutations');
const RequestMutation = require('./mutations/request.mutations');
const TechnologyMutation = require('./mutations/technology.mutations');
const CaseStudyMutation = require('./mutations/caseStudy.mutations');
const IndustryMutation = require('./mutations/industry.mutations');
const VacancyRequestMutation = require('./mutations/vacancyRequest.mutations');

module.exports = {
  ...PostMutation,
  ...UserMutation,
  ...OfficeMutation,
  ...VacancyMutation,
  ...ClientMutation,
  ...RequestMutation,
  ...TechnologyMutation,
  ...CaseStudyMutation,
  ...IndustryMutation,
  ...VacancyRequestMutation,
};
