import { queryResolvers } from './queries.js';
import { mutationResolvers } from './mutations.js';
import GraphQLJSON from 'graphql-type-json';

export const resolvers = {
  JSON: GraphQLJSON,
  Query: queryResolvers,
  Mutation: mutationResolvers,
};