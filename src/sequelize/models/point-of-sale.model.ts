import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateGenericType,
} from '../interfaces/model.interfaces';

export interface PointOfSaleAttributes extends CreationDateUpdatedDate {
  id: number;
  orderId: string | null;
  customerId: string | null;
  date: Date | null;
  sku: string | null;
  quantity: number | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip: string | null;
  store: string | null;
}

export interface PointOfSaleCreationAttributes
  extends Optional<
    PointOfSaleAttributes,
    CreationDateUpdatedDateGenericType<'id'>
  > {}

export class PointOfSale
  extends Model<PointOfSaleAttributes, PointOfSaleCreationAttributes>
  implements PointOfSaleAttributes
{
  id!: number;
  orderId!: string | null;
  customerId!: string | null;
  date!: Date | null;
  sku!: string | null;
  quantity!: number | null;
  city!: string | null;
  state!: string | null;
  country!: string | null;
  zip!: string | null;
  store!: string | null;
  recordCreationDate!: Date;
  recordUpdatedDate!: Date;
}

export default (sequelize: Sequelize): typeof PointOfSale => {
  PointOfSale.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        field: 'order_id',
        type: DataTypes.STRING,
      },
      customerId: {
        field: 'customer_id',
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      sku: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.DECIMAL,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      zip: {
        type: DataTypes.STRING(12),
      },
      store: {
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
    },
    {
      modelName: 'PointOfSale',
      tableName: 'point_of_sale',
      sequelize,
      createdAt: RECORD_CREATION_DATE_FIELD,
      updatedAt: RECORD_UPDATED_DATE_FIELD,
    }
  );
  return PointOfSale;
};
