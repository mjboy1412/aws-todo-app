import serverless from 'serverless-http';
import express from 'express';
import helmet from 'helmet';

import { todoRoutes, imageRoutes, healthRoutes } from './routes';
import { config } from './config';

const app = express();

app.use(express.json());
app.use(helmet());

app.use(todoRoutes);
app.use(imageRoutes);
app.use(healthRoutes);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send();
  }
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500).send();
  }
);

app.listen(config.LOCAL_PORT, () => {
  console.log(`aws-todo-app listening on port ${config.LOCAL_PORT}`);
});

export const handler = serverless(app);
