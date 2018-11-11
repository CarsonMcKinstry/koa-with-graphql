import { ResolverFn } from 'apollo-server-koa';

const newLinkSubscribe: ResolverFn = (root, args, context, info) => {
  return context.db.subscription.link(
    {
      where: { mutation_in: ['CREATED'] }
    },
    info,
  );
};

const newVoteSubscribe: ResolverFn = (root, args, context, info) => {
  return context.db.subscription.vote(
    { where: { mutation_in: ['CREATED'] } },
    info,
  );
};

export const newLink = {
  subscribe: newLinkSubscribe,
};

export const newVote = {
  subscribe: newVoteSubscribe
};