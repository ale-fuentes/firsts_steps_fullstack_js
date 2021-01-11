//app.ts
// before __commons__
// import express from 'express';
// import bodyParser from 'body-parser';
// import helmet from 'helmet';

// after __commons__
import app from 'ms-commons/api/app'
import accountRouter from '../routes/accounts';

// before __commons__
// const app = express();
// app.use(helmet());
// app.use(bodyParser.json());
// app.use(accountRouter);

export default app(accountRouter);

// express
// bodyparser
// helmet
