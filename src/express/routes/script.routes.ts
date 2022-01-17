import { Express } from 'express';
import { Script } from '../../sequelize/models/script.model';
import prefixRoute from '../utils/prefix-route';

export default (app: Express, prefix?: string): void => {
  app.get(prefixRoute('/scripts', prefix), async (request, response) => {
    response.json(await Script.findAll());
  });
};
