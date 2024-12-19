import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

export { app };