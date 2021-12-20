import fs from 'fs';
import { GraphQLResolveInfo } from 'graphql';
import { Upload, UploadAttributes } from '../../sequelize/models/upload.model';
import { Context } from '../../server';
import queryFields from '../utils/query-fields';

export enum UploadFields {
  ID = 'id',
  DESTINATION = 'destination',
  ENCODING = 'encoding',
  FIELD_NAME = 'fieldname',
  FILE_NAME = 'filename',
  MIME_TYPE = 'mimetype',
  ORIGINAL = 'originalname',
  PATH = 'path',
  SIZE = 'size',
}

export default {
  Query: {
    uploads: (
      root: unknown,
      args: unknown,
      context: Context,
      info: GraphQLResolveInfo
    ): Promise<UploadAttributes[]> => {
      return Upload.findAll({
        attributes: queryFields(info, Object.values(UploadFields)),
      });
    },
  },
  Mutation: {
    deleteUploads: async (
      root: unknown,
      { uploads }: { uploads: UploadAttributes[] }
    ) => {
      const ids = uploads.map(upload => upload.id);
      await Upload.destroy({
        where: { id: ids },
      });
      uploads.forEach(upload => fs.unlinkSync(upload.path));
      return ids;
    },
    renameUpload: async (
      root: unknown,
      { id, newName }: { id: number; newName: string },
      context: Context
    ) => {
      try {
        return context.sequelize.transaction(async transaction => {
          const upload = await Upload.findByPk(id, { transaction });
          return upload?.update(
            {
              originalname: newName,
            },
            { transaction }
          );
        });
      } catch {
        // TODO: Handle failure more cleanly
        return undefined;
      }
    },
  },
};
