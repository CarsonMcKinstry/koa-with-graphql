import { FeedToLinksResolver } from '../schema.d';

export const links: FeedToLinksResolver = (root, args, context, info) => {
  return context.db.query.links(
    {
      where: { 
        id_in: root.linkIds 
      }
    }, 
    info, 
  );
}