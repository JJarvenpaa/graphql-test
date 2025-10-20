import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { resolvers } from './resolvers/index.js';
import { createContext } from './context.js';

// Define your GraphQL schema
//TODO: remember to update frontend queries and mutations accordingly
const typeDefs = `#graphql
  scalar JSON

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    ingredients: [String!]
    toppings: JSON
    imgUrl: String
    enabled: Boolean
    campaigns: [String!]
    category: Int!
    dietaries: [Int!]
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  input CreateProduct {
    name: String!
    description: String
    price: Float!
    ingredients: [String!]
    toppings: JSON
    imgUrl: String
    enabled: Boolean = true
    campaigns: [String!] = []
    category: Int!
    dietaries: [Int!] = []
  }

  input UpdateProduct {
    id: ID!
    name: String!
    description: String
    price: Float!
    ingredients: [String!]
    toppings: JSON
    imgUrl: String
    enabled: Boolean
    campaigns: [String!]
    category: Int!
    dietaries: [Int!]
  }

  type CreateProductMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    product: Product
  }

  type UpdateProductMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    product: Product
  }

  type DeleteProductMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Query {
    hello: String
    products: [Product!]
  }

  type Mutation {
    createProduct(input: CreateProduct!): CreateProductMutationResponse
    updateProduct(input: UpdateProduct!): UpdateProductMutationResponse
    deleteProduct(id: ID!): DeleteProductMutationResponse
  }

`;

const app = express();
const httpServer = http.createServer(app);

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// Apply middleware
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: createContext,
  }),
);

//TODO: Add error handling middleware
//TODO: Add authentication to server

// Start the Express server
//TODO: Is this error handling explicit enough?
const PORT = process.env.PORT || 4000;
await new Promise<void>((resolve, reject) => {
  httpServer.listen({ port: PORT }, (error?: Error) => {
    if(error) reject(error);
    else resolve();
  });
});
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
