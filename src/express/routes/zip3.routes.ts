import { Express } from 'express';
import prefixRoute from '../utils/prefix-route';

export default (app: Express, prefix?: string): void => {
  app.get(prefixRoute('/zip3', prefix), async (request, response) => {
    //   const zip3Shapes = await GeographicFeature.findAll({
    //     where: {
    //       shapeType: ShapeType.ZIP3,
    //     },
    //     attributes: ['id', 'geometry_type', 'coordinates'],
    //   });
    //   response.json(zip3Shapes);
    response.json({ msg: 'TODO: Send zip3 geojson file' });
  });
};
