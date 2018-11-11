import { ResolverFn } from "apollo-server-koa";

const user: ResolverFn = (root, args, context, info) => {
  return context.db.query.user({ where: { id: root.user.id }}, info);
}
