import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import getUserFromToken from './utils/user/getUserFromToken.js';
import resolvers from './resolvers/index.js';
import typeDefs from '../schema/index.js';

const { json } = bodyParser;
const prisma = new PrismaClient();

const app = express();
const httpServer = http.createServer(app);

type Role = 'USER' | 'ADMIN';

interface OurContext {
  user?: {
    id: string;
    role: Role;
  };
  prisma: PrismaClient;
}

const server = new ApolloServer<OurContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cookieParser());
app.use(
  '/graphql',

  cors<cors.CorsRequest>({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_NETWORK_URL],
    credentials: true,
  }),

  json(),

  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const { userToken } = req.cookies;

      const user = await getUserFromToken(userToken, prisma);

      return {
        req,
        res,
        prisma,
        user,
      };
    },
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 5000 }, resolve)
);

console.log(`🚀 Server ready at http://localhost:5000/graphql`);
