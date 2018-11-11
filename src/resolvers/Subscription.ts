import { ResolverFn } from 'apollo-server-koa';
import {
  SubscriptionToNewLinkResolver, SubscriptionToNewVoteResolver
} from '../schema.d';

export const newLink: SubscriptionToNewLinkResolver = {
  subscribe: (root, args, context, info) => {
    return context.db.subscription.link(
      {
        where: { mutation_in: ['CREATED'] }
      },
      info,
    );
  },
};

export const newVote: SubscriptionToNewVoteResolver = {
  subscribe: (root, args, context, info) => {
    return context.db.subscription.vote(
      { where: { mutation_in: ['CREATED'] } },
      info,
    );
  }
};