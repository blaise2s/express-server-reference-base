import { IResolvers } from '@graphql-tools/utils';
import {
  ApolloServerPluginDrainHttpServer,
  Context as Ctxt,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { DocumentNode } from 'graphql';
import http from 'http';
import { Model, ModelCtor, Sequelize } from 'sequelize';
import express from './express/express';
import theResolvers from './graphql/resolvers';
import theTypeDefs from './graphql/type-defs';
import { Upload } from './sequelize/models/upload.model';
import initSequelize from './sequelize/sequelize';

export interface Context extends Ctxt {
  sequelize: Sequelize;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  Upload: ModelCtor<Model<any, any>>;
}

const startApolloServer = async (
  app: Express,
  typeDefs: DocumentNode,
  resolvers: IResolvers,
  forceSync = false
): Promise<void> => {
  // Initialize sequelize
  const sequelize = initSequelize();

  // Verify DB connection and sync models
  try {
    await sequelize.authenticate();
    /* eslint-disable-next-line no-console */
    console.info('DB Connection has been established successfully.');

    // Sync model
    Upload.sync({ force: forceSync });
    /* eslint-disable-next-line no-console */
    console.info(`Synced tables${forceSync ? ' forcefully.' : '.'}`);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error('Unable to connect to the DB:', error);
  }

  // Construct server
  const httpServer = http.createServer(app);
  const context: Context = {
    sequelize,
    Upload: sequelize.models.Upload,
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context,
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/api/bricz-server/v1/graphql',
  });

  const port = process.env.PORT || 3000;
  await new Promise<void>(resolve => {
    httpServer.listen({ port }, resolve);
  });
  // eslint-disable-next-line no-console
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
};

startApolloServer(express, theTypeDefs, theResolvers, false);
