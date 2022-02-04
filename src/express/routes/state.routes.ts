import { Express } from 'express';
import prefixRoute from '../utils/prefix-route';

export default (app: Express, prefix?: string): void => {
  app.get(prefixRoute('/states', prefix), (request, response) => {
    response.json({ msg: 'TODO: Send states geojson file' });
  });
};
