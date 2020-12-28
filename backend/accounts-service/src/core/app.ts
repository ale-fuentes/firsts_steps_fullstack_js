//app.ts
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import accountRouter from '../routes/accounts';

const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.use(accountRouter);

export default app;

// express
// bodyparser
// helmet
