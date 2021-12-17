import { Express, Request } from 'express';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
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
  if (file.mimetype === 'text/csv') {
    callback(null, true);
    return;
  }
  callback(null, false);
};
const uploadConfig = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter,
});

export const uploadsPath = '/uploads';

let idAssignment = 1;
interface Upload extends Express.Multer.File {
  id: number;
}
let storedFiles: Upload[] = [];

export default (app: Express, prefix?: string): void => {
  app.post(
    prefixRoute(uploadsPath, prefix),
    uploadConfig.array('files'),
    (request, response) => {
      const { files } = request;
      if (files && files instanceof Array) {
        files.forEach(file => {
          storedFiles.push({
            ...file,
            id: idAssignment,
          });
          idAssignment += 1;
        });
        return response.sendStatus(204);
      }
      return response.sendStatus(500);
    }
  );

  app.get(prefixRoute(uploadsPath, prefix), (request, response) => {
    response.json(storedFiles);
  });

  app.delete(prefixRoute(uploadsPath, prefix), (request, response) => {
    const uploads: Upload[] = request.body;
    const ids = uploads.map(upload => upload.id);
    storedFiles = storedFiles.filter(storedFile => {
      fs.unlinkSync(storedFile.path);
      return !ids.includes(storedFile.id);
    });
    response.json({});
  });
};
