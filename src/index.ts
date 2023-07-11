import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type User {
    id: Int
    createdAt: String
    updatedAt: String
    email: String
    name: String
    password: String
    role: Role
  }

  enum Role {
    USER
    ADMIN
  }
`;
