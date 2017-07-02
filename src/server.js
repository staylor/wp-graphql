import 'dotenv/config';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import Schema from 'schema';
import getClient, { HASH_KEY } from 'data/client';
import getLoaders from 'data/loaders';
import queryLogger from './middleware/queryLogger';

/* eslint-disable no-console */

process.env.TZ = 'America/New_York';

const app = express();
app.use(cookieParser());

app.use(
  '/graphql',
  responseTime((req, res, time) => {
    console.log(`Response time: ${Math.floor(time)}ms`);
  })
);

app.use(express.static('public'));

app.use('/graphql', bodyParser.json(), async (req, res, next) => {
  const fragment = req.body && req.body.query && req.body.query.substring(0, 3);
  if (fragment === 'id:') {
    const queryID = req.body.query.substring(3);
    console.log(`Hydrating Query: ${queryID}`);
    const client = getClient();
    const query = await client.hgetAsync(HASH_KEY, queryID);
    req.body.query = query;
  }
  next();
});

// uncomment this to output incoming query and request headers
app.use(queryLogger());

app.use('/graphql', (req, res, next) =>
  graphQLHTTP(request => ({
    graphiql: true,
    schema: Schema,
    rootValue: {
      cookies: request.cookies,
      loaders: getLoaders(),
    },
  }))(req, res, next)
);

app.listen(process.env.GRAPHQL_PORT, () => {
  console.log(`GraphQL Server is now running on port ${process.env.GRAPHQL_PORT}`);
});
