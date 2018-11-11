import { IResolverObject } from 'apollo-server-koa';
import * as Query from './Query';
import * as Mutation from './Mutation';
import * as Feed from './Feed';
import * as AuthPayload from './AuthPayload';
import * as Subscription from './Subscription';

const resolvers = {
  Query,
  Mutation: (Mutation as IResolverObject), // wut
  Feed,
  AuthPayload,
  Subscription,
}

export default resolvers;