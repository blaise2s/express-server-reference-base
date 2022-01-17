import { Express } from 'express';
import { State } from '../../sequelize/models/state.model';
import statesGeoJSON from '../constants/states-geo.json';
import prefixRoute from '../utils/prefix-route';

export default (app: Express, prefix?: string): void => {
  app.get(prefixRoute('/states', prefix), async (request, response) => {
    response.json(await State.findAll());
  });

  app.get(prefixRoute('/states/geoJSON', prefix), async (request, response) => {
    response.json(statesGeoJSON);
  });
};
