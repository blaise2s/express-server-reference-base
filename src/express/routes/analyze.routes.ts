import { Express } from 'express';
import { python } from '../../exec/analyze';
import prefixRoute from '../utils/prefix-route';

export default (app: Express, prefix?: string): void => {
  app.post(prefixRoute('/analyze', prefix), async (request, response) => {
    const { scriptId, file1Id, file2Id, file3Id } = request.body;
    const result = await python(scriptId, file1Id, file2Id, file3Id);
    response.json(JSON.parse(result.toString()));
  });
};
