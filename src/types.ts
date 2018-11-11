import { Context } from 'koa';
import { Prisma } from './generated/prisma-client';

export interface ApolloContext {
  ctx: Context,
  db: Prisma
}

export interface AuthPayload {
  userId: string
}

export type ContextFn = (req: Context) => ApolloContext;

export type Resolver<T> = (
  root: any,
  args: { [key: string]: any },
  context: ApolloContext,
  info: string
) => T;