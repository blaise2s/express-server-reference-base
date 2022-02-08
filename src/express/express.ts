import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import initRoutes from './routes';

const app = express();
app.use(bodyParser.json());

// TODO: Configure cors more specifically for our needs
app.use(cors());

const prefix = '/api/bricz-server/v1';
initRoutes(app, prefix);

export default app;
