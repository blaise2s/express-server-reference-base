import { GraphQLResolveInfo } from 'graphql';
import { Script, ScriptAttributes } from '../../sequelize/models/script.model';
import { Context } from '../../server';
import queryFields from '../utils/query-fields';

export enum ScriptFields {
  ID = 'id',
  NAME = 'name',
  DESCRIPTION = 'description',
  NUM_ARGS = 'numArgs',
  ARGS = 'args',
}

export default {
  Query: {
    scripts: (
      root: unknown,
      args: undefined,
      context: Context,
      info: GraphQLResolveInfo
    ): Promise<ScriptAttributes[]> => {
      return Script.findAll({
        attributes: queryFields(info, Object.values(ScriptFields)),
      });
    },
  },
};
