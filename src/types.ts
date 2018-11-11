import { Context } from 'koa';
import { Prisma } from 'prisma-binding';

export interface AuthPayload {
  userId: string
}

export interface KoaContext {
  ctx: Context,
  db?: Prisma
}