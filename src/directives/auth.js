/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
const { AuthenticationError, SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    // eslint-disable-next-line no-param-reassign
    // eslint-disable-next-line func-names
    field.resolve = function (...args) {
      const { user } = args[2];
      if (!user) throw new AuthenticationError('You are not authenticated!');
      return resolve.apply(this, args);
    };
  }
}

module.exports = AuthDirective;
