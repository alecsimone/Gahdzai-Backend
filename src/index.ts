import { ApolloServer, BaseContext } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import getUserFromToken from "./utils/user/getUserFromToken.js";
import createUser from "./resolvers/mutation/user/createUser.js";
import currentUser from "./resolvers/query/user/currentUser.js";

const { json } = bodyParser;
const prisma = new PrismaClient();

const typeDefs = `#graphql
  type User {
    id: String
    email: String
    password: String
    displayName: String
    role: Role
    avatar: String
    createdAt: String
    updatedAt: String
  }

  enum Role {
    USER
    ADMIN
  }

  type Query {
    allUsers: [User]
    currentUser(id: String): User
  }

  type Mutation {
    createUser(displayName: String!, email: String!, password: String!): User
  }
`;

const resolvers = {
  Query: {
    allUsers: () => prisma.user.findMany(),
    currentUser,
  },
  Mutation: {
    createUser,
  },
};

const app = express();
const httpServer = http.createServer(app);

type Role = "USER" | "ADMIN";

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
  "/graphql",

  cors<cors.CorsRequest>({
    origin: [process.env.FRONTEND_URL],
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
