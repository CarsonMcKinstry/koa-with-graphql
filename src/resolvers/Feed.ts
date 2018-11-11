import { ResolverFn } from 'apollo-server-koa';

export const links: ResolverFn = (root, args, context, info) => {
  return context.db.query.links(
    {
      where: { 
        id_in: root.linkIds 
      }
    }, 
    info, 
  );
}