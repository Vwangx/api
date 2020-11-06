const mongoose = require('mongoose');
const moment = require('moment');
const chalk = require('chalk');

const env = process.env.NODE_ENV || 'development';

const {
  MONGO_SERVICE_HOST_NAME,
  MONGO_SERVICE_DATABASE_NAME,
  MONGO_SERVICE_PORT,
  MONGO_SERVICE_USERNAME,
  MONGO_SERVICE_PASSWORD,
} = process.env;

const connections = {
  // eslint-disable-next-line max-len
  development: `mongodb://${MONGO_SERVICE_USERNAME}:${MONGO_SERVICE_PASSWORD}@${MONGO_SERVICE_HOST_NAME}:${MONGO_SERVICE_PORT}/${MONGO_SERVICE_DATABASE_NAME}`,
  // eslint-disable-next-line max-len
  production: `mongodb://${MONGO_SERVICE_USERNAME}:${MONGO_SERVICE_PASSWORD}@${MONGO_SERVICE_HOST_NAME}:${MONGO_SERVICE_PORT}/${MONGO_SERVICE_DATABASE_NAME}`,
};

const dbURL = connections[env];

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.warn(`[${chalk.bold.yellow(moment().format('DD/MM/YYYY hh:mm'))}] Mongoose default connection is open`);
});

mongoose.connection.on('error', (err) => {
  console.warn(`[${chalk.bold.red(moment().format('DD/MM/YYYY hh:mm'))}] Mongoose occured ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn(`[${chalk.bold.red(moment().format('DD/MM/YYYY hh:mm'))}] Mongoose default connection is disconnected`);
});
