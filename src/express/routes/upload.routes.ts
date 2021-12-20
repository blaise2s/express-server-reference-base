import { Express, Request } from 'express';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import { Upload, UploadAttributes } from '../../sequelize/models/upload.model';
import prefixRoute from '../utils/prefix-route';

const storagePath = './uploads';
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, storagePath);
  },
  // filename: (request, file, callback) => {
  //   callback(null, new Date().toISOString().concat(file.originalname));
  // },
});
const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const { mimetype } = file;
  if (mimetype === 'text/csv' || mimetype === 'text/tab-separated-values') {
    callback(null, true);
    return;
  }
  callback(null, false);
};
const uploadConfig = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 500,
  },
  fileFilter,
});

export const uploadsPath = '/uploads';

export default (app: Express, prefix?: string): void => {
  app.post(
    prefixRoute(uploadsPath, prefix),
    uploadConfig.array('files'),
    async (request, response) => {
      try {
        const { files } = request;
        if (files && files instanceof Array) {
          await Upload.bulkCreate(files);
          return response.sendStatus(204);
        }
        return response.sendStatus(500);
      } catch {
        return response.sendStatus(500);
      }
    }
  );

  app.get(prefixRoute(uploadsPath, prefix), async (request, response) => {
    response.json(await Upload.findAll());
  });

  app.delete(prefixRoute(uploadsPath, prefix), async (request, response) => {
    const uploads: UploadAttributes[] = request.body;
    const ids = uploads.map(upload => upload.id);
    await Upload.destroy({
      where: {
        id: ids,
      },
    });
    uploads.forEach(upload => fs.unlinkSync(upload.path));
    response.json({});
  });
};
