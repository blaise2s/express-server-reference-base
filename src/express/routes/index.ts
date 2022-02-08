import { Express } from 'express';
import analyzeRoutes from './analyze.routes';
import healthCheckRoutes from './health-check.routes';
import stateRoutes from './state.routes';
import uploadRoutes from './upload.routes';
import zip3Routes from './zip3.routes';

export default (app: Express, prefix?: string): void => {
  const routes = [
    healthCheckRoutes,
    uploadRoutes,
    analyzeRoutes,
    stateRoutes,
    zip3Routes,
  ];
  routes.forEach(route => {
    route(app, prefix);
  });
};
