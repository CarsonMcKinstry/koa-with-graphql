import { default as Koa } from 'koa';
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

server.applyMiddleware({ app });
server.installSubscriptionHandlers(app.listen(port, host, () =>
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`),
));



