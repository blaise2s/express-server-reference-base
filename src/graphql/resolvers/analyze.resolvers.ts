import { GraphQLResolveInfo } from 'graphql';
import { python } from '../../exec/analyze';
import { Context } from '../../server';

export default {
  Query: {
    analyze: async (
      root: unknown,
      args: {
        scriptId: number;
        file1Id: number;
        file2Id?: number;
        file3Id?: number;
      },
      context: Context,
      info: GraphQLResolveInfo
    ) => {
      const { scriptId, file1Id, file2Id, file3Id } = args;
      const result = await python(scriptId, file1Id, file2Id, file3Id);
      return JSON.parse(result.toString());
      // TODO: Send more meaningful response message and code
    },
  },
};
