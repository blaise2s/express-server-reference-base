// eslint-disable-line
// eslint-disable-next-line import/no-unresolved
import { parse } from 'csv-parse/sync';
// Not sure why the package above can't be resolved
// or why all the eslint errors show up.
import { Express, Request } from 'express';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import {
  Location,
  LocationCreationAttributes,
} from '../../sequelize/models/location.model';
import { facilityType } from '../../sequelize/models/utils/enum-from';
import prefixRoute from '../utils/prefix-route';

enum MimeType {
  CSV = 'text/csv',
  TSV = 'text/tab-separated-values',
}

enum UploadType {
  E_COMMERCE = 'E_COMMERCE',
  POINT_OF_SALE = 'POINT_OF_SALE',
  LOCATION = 'LOCATION',
}

interface DataImport {
  type: string;
  records: string[][];
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './uploads');
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const { mimetype } = file;
  if (mimetype === MimeType.CSV || mimetype === MimeType.TSV) {
    callback(null, true);
    return;
  }
  callback(null, false);
};
const uploadConfig = multer({
  storage,
  fileFilter,
});

const mapRecordToLocation = (record: string[]): LocationCreationAttributes => {
  return {
    facilityId: record[0],
    address1: record[1],
    address2: record[2],
    city: record[3],
    stateProvence: record[4],
    zipCode: record[5],
    countryCode: record[6],
    longitude: parseFloat(record[7]),
    latitude: parseFloat(record[8]),
    facilityType: facilityType(record[9]),
    sellableSquareFt: parseInt(record[10], 10),
    storageSquareFt: parseInt(record[11], 10),
  };
};

const upload = async (dataImports: DataImport[]) => {
  const uploads = dataImports.map(dataImport => {
    switch (dataImport.type) {
      case UploadType.E_COMMERCE:
        // return ECommerce.bulkCreate([], {
        //   returning: ['id'],
        // });
        return 1;

      case UploadType.POINT_OF_SALE:
        // return PointOfSale.bulkCreate([], {
        //   returning: ['id'],
        // });
        return 2;

      case UploadType.LOCATION:
        return Location.bulkCreate(
          dataImport.records.map<LocationCreationAttributes>(
            mapRecordToLocation
          ),
          {
            returning: ['id'],
          }
        );

      default:
        throw new Error(`Unrecognized upload type ${dataImport.type}`);
    }
  });

  return Promise.all(uploads);
};

const parseFiles = async (
  files: Express.Multer.File[],
  types: string[]
): Promise<void> => {
  const dataImports: DataImport[] = [];
  files.forEach((file, idx) => {
    const type = types[idx];
    const content = fs.readFileSync(file.path);
    const records = parse(content, {
      delimiter: file.mimetype === MimeType.CSV ? ',' : '\t',
      fromLine: 2,
      encoding: 'utf8',
    });
    dataImports.push({
      type,
      records,
    });
    fs.rmSync(file.path);
  });
  await upload(dataImports);
};

export default (app: Express, prefix?: string): void => {
  app.post(
    prefixRoute('/uploads', prefix),
    uploadConfig.array('files'),
    async (request, response) => {
      try {
        const { files } = request;
        const { types }: { types: string } = request.body;
        if (files && files instanceof Array && types) {
          const typesList = types.split(',');
          await parseFiles(files, typesList);
          return response.sendStatus(204);
        }
        throw new Error(
          'Files or upload types were not able to be parsed from the request'
        );
      } catch (error) {
        return response.sendStatus(500);
      }
    }
  );
};
