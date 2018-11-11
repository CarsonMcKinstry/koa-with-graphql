import { ContextFn } from './types';
import { Prisma } from './generated/prisma-client/index';

const context: ContextFn = (req) => ({
  ...req,
  db: Prisma
});

export default context;