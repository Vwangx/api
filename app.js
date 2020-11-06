require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const moment = require('moment');
const chalk = require('chalk');
const { ApolloServer } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { print } = require('graphql');
const { graphqlUploadExpress } = require('graphql-upload');

/** Connect services */
require('./services/mongoose');
require('./services/redis');

/** Get Express Application */
const app = express();

/** Cors */
const corsConfig = {
  origin(origin, callback) {
    if (process.env.FRONTEND_URL.indexOf(origin) !== -1) callback(null, true);
    else callback(null, false);
  },
};

app.use(cors(corsConfig));

/** Express Middlewares */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** Middlewares */
const authotization = require('./middlewares/authotization');

app.use(authotization);

/** GraphQL */
app.use(graphqlUploadExpress());

const resolvers = require('./src/resolvers');
const schemaDirectives = require('./src/directives');

const loadedFiles = loadFilesSync(`${__dirname}/src/schema/**/*.gql`);
const typeDefs = print(mergeTypeDefs(loadedFiles));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  uploads: false,
  context: ({ req }) => ({ user: req.user }),
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

/** Start WebServer */
app.listen(3000, () => {
  console.warn(`[${chalk.bold.cyan(moment().format('DD/MM/YYYY hh:mm'))}] Running Express Server`);
  console.warn(`[${chalk.bold.cyan(moment().format('DD/MM/YYYY hh:mm'))}] GraphQL http://localhost:3000/graphql`);
});
