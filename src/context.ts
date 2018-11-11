import { Context } from 'koa';
// import { prisma } from './generated/prisma-client/index';
import { Prisma } from 'prisma-binding';

const context = (req: { ctx: Context }) => ({
  ...req,
  db: new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'mysecret123',
    debug: true
  })
});

export default context;