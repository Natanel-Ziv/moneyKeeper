import express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './routes';
import requestMiddleware from './framework/middleware/request.middleware';
import TxnRoutes from './txn/txn.routes';
import jsonErrorHandler from 'express-json-error-handler';

export const app = express();


/* Init middleware */
app.use(bodyParser.json());
app.use(requestMiddleware);
app.use(jsonErrorHandler());

/* Init routes */
app.use('/api/v1', Routes());
app.use('/api/v1', TxnRoutes());