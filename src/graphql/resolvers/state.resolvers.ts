import { GraphQLResolveInfo } from 'graphql';
import { State, StateAttributes } from '../../sequelize/models/state.model';
import { Context } from '../../server';
import queryFields from '../utils/query-fields';

export enum StateFields {
  NAME = 'name',
  ABV = 'abv',
  COUNTRY = 'country',
  IS_STATE = 'isstate',
  IS_LOWER_48 = 'islower48',
  SLUG = 'slug',
  LATITUDE = 'latitude',
  LONGITUDE = 'longitude',
  POPULATION = 'population',
  AREA = 'area',
}

export default {
  Query: {
    states: (
      root: unknown,
      args: undefined,
      context: Context,
      info: GraphQLResolveInfo
    ): Promise<StateAttributes[]> => {
      return State.findAll({
        attributes: queryFields(info, Object.values(StateFields)),
      });
    },
  },
};
