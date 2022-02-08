import { DataTypes } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import { Migration } from './umzug';

const TABLE_NAME = 'locations';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    facilityId: {
      field: 'facility_id',
      type: DataTypes.STRING,
    },
    address1: {
      field: 'address_1',
      type: DataTypes.STRING,
    },
    address2: {
      field: 'address_2',
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    stateProvence: {
      field: 'state_prov',
      type: DataTypes.STRING,
    },
    zipCode: {
      field: 'zip_code',
      type: DataTypes.STRING(12),
    },
    countryCode: {
      field: 'country_code',
      type: DataTypes.STRING(10),
    },
    longitude: {
      type: DataTypes.DECIMAL,
    },
    latitude: {
      type: DataTypes.DECIMAL,
    },
    facilityType: {
      field: 'facility_type',
      type: DataTypes.ENUM('STORE', 'OUTLET', 'DC', 'WAREHOUSE', 'OTHER'),
    },
    sellableSquareFt: {
      type: DataTypes.INTEGER,
      field: 'sellable_sq_ft',
    },
    storageSquareFt: {
      type: DataTypes.INTEGER,
      field: 'storage_sq_ft',
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
