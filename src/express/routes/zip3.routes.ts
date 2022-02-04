import { Express } from 'express';
import prefixRoute from '../utils/prefix-route';

export default (app: Express, prefix?: string): void => {
  app.get(prefixRoute('/zip3', prefix), (request, response) => {
    response.json({ msg: 'TODO: Send zip3 geojson file' });
  });
};
