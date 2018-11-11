import { ResolverFn } from 'apollo-server-koa';
import { Resolver } from '../types';
import { Link } from '../generated/prisma-client/prisma-schema';

export const info: Resolver<string> = () => 'Hello World';

export const feed: ResolverFn = async (root, args, context, info) => {
  const where = args.filter
  ? {
    OR: [
      { url_contains: args.filter },
      { description_contains: args.filter }
    ],
  }
  : {};

const queriedLinks = await context.db.query.links({ 
  where,
  skip: args.skip,
  first: args.first,
  orderBy: args.orderBy
}, `{ id }`);

const countSelectionSet = `
  {
    aggregate {
      count
    }
  }
`;

const linksConnection = await context.db.query.linksConnection({}, countSelectionSet);

return {
  count: linksConnection.aggregate.count,
  linkIds: queriedLinks.map((link: Link) => link.id),
}
}