import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateType,
} from '../interfaces/model.interfaces';

// Not UPPERCASE because the name matches the geojson geometry types https://geojson.org/
export enum GeometryType {
  Point = 'Point',
  MultiPoint = 'MultiPoint',
  LineString = 'LineString',
  MultiLineString = 'MultiLineString',
  Polygon = 'Polygon',
  MultiPolygon = 'MultiPolygon',
  GeometryCollection = 'GeometryCollection',
}

export const GeometryTypeValues = [
  'Point',
  'MultiPoint',
  'LineString',
  'MultiLineString',
  'Polygon',
  'MultiPolygon',
  'GeometryCollection',
];

export enum ShapeType {
  STATE = 'STATE',
  ZIP3 = 'ZIP3',
}

export const ShapeTypeValues = ['STATE', 'ZIP3'];

export interface GeographicFeatureAttributes extends CreationDateUpdatedDate {
  id: string;
  geometryType: GeometryType;
  shapeType: ShapeType;
  coordinates: number[][][][] | number[][][];
  properties: { [key: string]: string | number } | null;
}

export interface GeographicFeatureCreationAttributes
  extends Optional<GeographicFeatureAttributes, CreationDateUpdatedDateType> {}

export class GeographicFeature
  extends Model<
    GeographicFeatureAttributes,
    GeographicFeatureCreationAttributes
  >
  implements GeographicFeatureAttributes
{
  id!: string;
  geometryType!: GeometryType;
  shapeType!: ShapeType;
  coordinates!: number[][][][] | number[][][];
  properties!: { [key: string]: string | number } | null;
  recordCreationDate!: Date;
  recordUpdatedDate!: Date;
}

export default (sequelize: Sequelize): typeof GeographicFeature => {
  GeographicFeature.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      geometryType: {
        field: 'geometry_type',
        type: DataTypes.ENUM(
          'Point',
          'MultiPoint',
          'LineString',
          'MultiLineString',
          'Polygon',
          'MultiPolygon',
          'GeometryCollection'
        ),
        allowNull: false,
      },
      shapeType: {
        field: 'shape_type',
        type: DataTypes.ENUM('STATE', 'ZIP3'),
        allowNull: false,
      },
      coordinates: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      properties: {
        type: DataTypes.JSONB,
      },
      recordCreationDate: {
        field: RECORD_CREATION_DATE_FIELD,
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
      recordUpdatedDate: {
        field: RECORD_UPDATED_DATE_FIELD,
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
    },
    {
      modelName: 'GeographicFeature',
      tableName: 'geographic_features',
      sequelize,
      createdAt: RECORD_CREATION_DATE_FIELD,
      updatedAt: RECORD_UPDATED_DATE_FIELD,
    }
  );
  return GeographicFeature;
};
