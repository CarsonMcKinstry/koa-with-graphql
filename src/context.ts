import { Context } from 'koa';
import { prisma } from './generated/prisma-client/index';

const context = (req: { ctx: Context }) => ({
  ...req,
  db: prisma
});

export default context;