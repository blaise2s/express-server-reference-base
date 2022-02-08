import { Express } from 'express';
import states from '../json/states.minified.json';
import prefixRoute from '../utils/prefix-route';

export default (app: Express, prefix?: string): void => {
  app.get(prefixRoute('/states', prefix), async (request, response) => {
    // const stateShapes = await GeographicFeature.findAll({
    //   where: {
    //     shapeType: ShapeType.STATE,
    //   },
    //   attributes: ['id', 'geometry_type', 'coordinates'],
    // });
    response.json(states);
  });
};
