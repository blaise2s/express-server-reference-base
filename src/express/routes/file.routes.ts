import { Express } from 'express';
import fs from 'fs';
import prefixRoute from '../utils/prefix-route';
import { uploadsPath } from './upload.routes';

export default (app: Express, prefix?: string): void => {
  app.get(prefixRoute(uploadsPath, prefix), (request, response) => {
    const files = fs.readdirSync('uploads');
    response.json({ files });
  });
};
