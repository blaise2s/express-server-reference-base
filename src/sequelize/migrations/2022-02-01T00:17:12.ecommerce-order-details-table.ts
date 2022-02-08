import { DataTypes } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import { Migration } from './umzug';

const TABLE_NAME = 'ecommerce_order_details';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      field: 'order_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sku: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL,
    },
    warehouse: {
      type: DataTypes.STRING,
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
