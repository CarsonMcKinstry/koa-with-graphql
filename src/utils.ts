import { AuthPayload, KoaContext } from './types';
import jwt from 'jsonwebtoken';

export const APP_SECRET = `GraphQL-is-aw3some`;

export function getUserId(context: KoaContext) {
  const Authorization = context.ctx.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = (jwt.verify(token, APP_SECRET) as AuthPayload);
    if (!userId) throw new Error('Not authorized');
    return userId;
  }

  throw new Error('Not authenticated');
}