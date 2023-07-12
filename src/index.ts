import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type User {
    id: Int
    email: String
    password: String
    name: String
    role: Role
    createdAt: String
    updatedAt: String
  }

  enum Role {
    USER
    ADMIN
  }
`;
