'use strict'

const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash/merge');
const src = require('./src');
const schema = [...src.schema];
const resolvers = merge(src.resolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});

module.exports = executableSchema;
