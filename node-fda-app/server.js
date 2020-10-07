'use strict'

const express = require('express');
const app = express();
const cors = require('cors');
const { createServer } = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { graphqlExpress, graphiqlExpress  } = require('apollo-server-express');
const apolloServerRedisCache = require('apollo-server-redis-cache');
const Redis = require("ioredis");
const schema = require('./schema');

const redisCache = new apolloServerRedisCache({ cache: false, key: 'fda', ttl: 900, stale: 60, httpHeader: 'X-My-Cache' });


function run({
    PORT = process.env.PORT || 4300
}) {

    redisCache.client = new Redis({
        port: process.env.npm_package_config_redis_port,
        host:  process.env.npm_package_config_redis_host,
        password:  process.env.npm_package_config_redis_password
    });
    redisCache.options.cache = true;

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());


    app.use('/api',
        (req, res, next) => {
            res.use_redis_cache = req.cookies['no-cache'] ? false : true;
            next();
        },
        redisCache.middleware(),
        graphqlExpress({ schema }));

    app.use('/api', graphiqlExpress({
        endpointURL: '/api'
    }));

    const server = createServer(app);

    server.listen(PORT, () => console.log(`Server running on port ${PORT}! CORS-enabled!`));

    return server;

}

module.exports = {
    run
};