import { ResolverFn } from 'apollo-server-koa';
import { 
  QueryToInfoResolver,
  QueryToFeedResolver,
  GQLLink
} from '../schema.d';

export const info: QueryToInfoResolver = () => 'Hello World';

export const feed: QueryToFeedResolver = async (root, args, context, info) => {
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
  linkIds: queriedLinks.map((link: GQLLink) => link.id),
}
}