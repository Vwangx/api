/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
const { AuthenticationError, SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

class AccessDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { require } = this.args;
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function (...args) {
      const { user } = args[2];
      if (!user) throw new AuthenticationError('You are not authenticated!');
      const canAccess = user.roles[require] === true;
      if (!canAccess) throw new AuthenticationError(`You need following roles: ${require}`);
      return resolve.apply(this, args);
    };
  }
}

module.exports = AccessDirective;
