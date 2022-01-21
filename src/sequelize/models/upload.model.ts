import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateGenericType,
} from '../interfaces/model.interfaces';

export interface UploadAttributes extends CreationDateUpdatedDate {
  id: number;
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}

export interface UploadCreationAttributes
  extends Optional<
    UploadAttributes,
    CreationDateUpdatedDateGenericType<'id'>
  > {}

export class Upload
  extends Model<UploadAttributes, UploadCreationAttributes>
  implements UploadAttributes
{
  id!: number;
  destination!: string;
  encoding!: string;
  fieldname!: string;
  filename!: string;
  mimetype!: string;
  originalname!: string;
  path!: string;
  size!: number;
  recordCreationDate!: Date;
  recordUpdatedDate!: Date;
}

export default (sequelize: Sequelize): typeof Upload => {
  Upload.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      destination: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      encoding: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      fieldname: {
        field: 'field_name',
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      filename: {
        field: 'file_name',
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      mimetype: {
        field: 'mime_type',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      originalname: {
        field: 'original_name',
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: 'Upload',
      tableName: 'uploads',
      sequelize,
      createdAt: RECORD_CREATION_DATE_FIELD,
      updatedAt: RECORD_UPDATED_DATE_FIELD,
    }
  );
  return Upload;
};
