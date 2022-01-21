import { DataTypes } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import { Migration } from './umzug';

const TABLE_NAME = 'uploads';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
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
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
