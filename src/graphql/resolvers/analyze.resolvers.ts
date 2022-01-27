import { GraphQLResolveInfo } from 'graphql';
import { python } from '../../exec/analyze';
import { Context } from '../../server';

export default {
  Query: {
    analyze: async (
      root: unknown,
      args: {
        scriptId: number;
      },
      context: Context,
      info: GraphQLResolveInfo
    ) => {
      const { scriptId } = args;
      const result = await python(scriptId);
      return JSON.parse(result.toString());
      // TODO: Send more meaningful response message and code
    },
  },
};
