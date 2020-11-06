const redis = require('redis');
const util = require('util');
const moment = require('moment');
const chalk = require('chalk');

const { REDIS_SERVICE_HOST = 'redis', REDIS_SERVICE_PORT = 6379 } = process.env;

const client = redis.createClient({
  host: REDIS_SERVICE_HOST,
  port: REDIS_SERVICE_PORT,
});

client.on('connect', () => {
  console.warn(`[${chalk.bold.yellow(moment().format('DD/MM/YYYY hh:mm'))}] Redis default connection is open`);
});
client.on('error', (err) => {
  console.warn(`[${chalk.bold.yellow(moment().format('DD/MM/YYYY hh:mm'))}] Redis occured ${err.message}`);
});

/** Create Proxy for promises */
const clientProxy = new Proxy(client, {
  get(target, propKey) {
    return util.promisify(target[propKey]).bind(target);
  },
});

module.exports = clientProxy;
