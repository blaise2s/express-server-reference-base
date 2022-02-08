/* eslint-disable no-console */
import fs from 'fs';
import { Feature, MultiPolygon, Polygon } from 'geojson';
import inquirer, { Question } from 'inquirer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JSONStream from 'JSONStream';
import {
  GeographicFeature,
  GeographicFeatureCreationAttributes,
} from '../src/sequelize/models/geographic-feature.model';
import {
  geometryType,
  shapeType,
} from '../src/sequelize/models/utils/enum-from';
import {
  isMultiPolygon,
  isPolygon,
} from '../src/sequelize/models/utils/type-guards';
import initSequelize from '../src/sequelize/sequelize';

const importGeoJsonPolyMultiPoly = (
  path: string,
  parse: string,
  callbackFn: (feature: Feature<Polygon | MultiPolygon>) => Promise<void>
): void => {
  const stream = fs.createReadStream(path, {
    encoding: 'utf-8',
  });
  const parser = JSONStream.parse(parse);
  stream.pipe(parser);
  parser.on('data', callbackFn);
};

const mapPolyMultiPolyToGeographicFeature = (
  geoJsonFeature: Feature<Polygon | MultiPolygon>,
  idKey: string
): GeographicFeatureCreationAttributes | undefined => {
  const { geometry, properties } = geoJsonFeature;
  if (isMultiPolygon(geometry) || isPolygon(geometry)) {
    if (!properties) {
      return undefined;
    }
    return {
      id: properties[idKey],
      geometryType: geometryType(geometry.type),
      shapeType: shapeType(properties[idKey]),
      coordinates: geometry.coordinates,
      properties,
    };
  }
  return undefined;
};

const createImportGeographicFeatureCallbackFn = (idKey: string) => {
  return async (feature: Feature<Polygon | MultiPolygon>) => {
    const geographicFeature = mapPolyMultiPolyToGeographicFeature(
      feature,
      idKey
    );
    await GeographicFeature.create(geographicFeature, { returning: ['id'] });
  };
};

const initializeStatesGeoJson = (): void => {
  importGeoJsonPolyMultiPoly(
    'src/express/json/states.minified.json',
    'features.*',
    createImportGeographicFeatureCallbackFn('abv')
  );
};

const initializeZip3GeoJson = (): void => {
  importGeoJsonPolyMultiPoly(
    'src/express/json/zip3.minified.json',
    'features.*',
    createImportGeographicFeatureCallbackFn('ZIP3')
  );
};

const connectDB = (): Promise<void> => {
  const sequelize = initSequelize();
  return sequelize.authenticate();
};

const main = (): void => {
  const questions: Question[] = [
    {
      type: 'confirm',
      name: 'initializeStates',
      message: 'Initialize states?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'initializeZip3',
      message: 'Initialize zip 3?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'continue',
      message:
        'Are you sure you want to initialize the geographic_features database?',
      default: false,
    },
  ];
  inquirer.prompt(questions).then(async answers => {
    if (
      (answers.initializeStates || answers.initializeZip3) &&
      answers.continue
    ) {
      await connectDB();
      console.info('Beginning initializations...');

      if (answers.initializeStates) {
        console.info('Initializing states...');
        initializeStatesGeoJson();
        console.info('State initialization complete.');
      }

      if (answers.initializeZip3) {
        console.info('Initializing zip 3...');
        initializeZip3GeoJson();
        console.info('Zip 3 initialization complete.');
      }
      console.info('Initializations complete.');
    } else {
      console.info('No initializations were run');
    }
  });
};

main();
