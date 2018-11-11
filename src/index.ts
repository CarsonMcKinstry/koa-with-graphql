import { default as Koa, Context } from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';
import { importSchema } from 'graphql-import';

import resolvers from './resolvers';
import context from './context';

const port = 4000;
const host = 'localhost';

const typeDefs = importSchema('./src/schema.graphql');

const server = new ApolloServer({ 
  typeDefs: gql`${typeDefs}`,
  resolvers,
  context,
});



const app = new Koa();

app.use((ctx: Context, next) => {
  console.log(ctx.request.rawBody);
  return next();
});

server.applyMiddleware({ app });
server.installSubscriptionHandlers(app.listen(port, host, () =>
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`),
));



