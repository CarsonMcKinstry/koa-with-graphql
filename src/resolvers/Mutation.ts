import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { 
  MutationToSignupResolver, 
  MutationToLoginResolver,
  MutationToPostResolver, 
  MutationToVoteResolver
} from '../schema.d';

import { getUserId, APP_SECRET } from '../utils';

export const signup: MutationToSignupResolver = async (root, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser({
    data: {
      ...args,
      password,
    }
  }, `{ id }`);

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
} 

export const login: MutationToLoginResolver = async (root, args, context, info) => {
  const user = await context.db.query.user({ where: { email: args.email }}, `{ id password }`);
  if (!user) {
    throw new Error('No such user found');
  }

  const valid: boolean = await bcrypt.compare(
    args.password,
    user.password
  );
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
}

export const post: MutationToPostResolver = (root, args, context, info) => {
  const userId = getUserId(context);
  return context.db.mutation.createLink(
    {
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } }
      }
    },
    info,
  )
}

export const vote: MutationToVoteResolver = async (root, args, context, info) => {
  const userId = getUserId(context);

  const linkExists = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: args.linkId },
  });
  
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
      }
    },
    info,
  )
}