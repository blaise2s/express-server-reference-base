import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import analyzeRoutes from './routes/analyze.routes';
import healthCheckRoutes from './routes/health-check.routes';

const app = express();
app.use(bodyParser.json());
// TODO: Configure cors more specifically for our needs
app.use(cors());
const prefix = '/api/bricz-server/v1';

const routes = [healthCheckRoutes, analyzeRoutes];
routes.forEach(route => {
  route(app, prefix);
});

export default app;
