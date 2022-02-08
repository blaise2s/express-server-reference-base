import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateGenericType,
} from '../interfaces/model.interfaces';

export interface EcommerceOrderHeaderAttributes
  extends CreationDateUpdatedDate {
  id: number;
  orderId: string | null;
  customerOrderId: string | null;
  date: Date | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
  totalQuantity: number | null;
  type: string | null;
  warehouse: string | null;
}

export interface EcommerceOrderHeaderCreationAttributes
  extends Optional<
    EcommerceOrderHeaderAttributes,
    CreationDateUpdatedDateGenericType<'id'>
  > {}

export class EcommerceOrderHeader
  extends Model<
    EcommerceOrderHeaderAttributes,
    EcommerceOrderHeaderCreationAttributes
  >
  implements EcommerceOrderHeaderAttributes
{
  id!: number;
  orderId!: string | null;
  customerOrderId!: string | null;
  date!: Date | null;
  city!: string | null;
  state!: string | null;
  country!: string | null;
  zipCode!: string | null;
  totalQuantity!: number | null;
  type!: string | null;
  warehouse!: string | null;
  recordCreationDate!: Date;
  recordUpdatedDate!: Date;
}

export default (sequelize: Sequelize): typeof EcommerceOrderHeader => {
  EcommerceOrderHeader.init(
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
      customerOrderId: {
        field: 'customer_order_id',
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
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
      zipCode: {
        field: 'zip_code',
        type: DataTypes.STRING(25),
      },
      totalQuantity: {
        field: 'total_qty',
        type: DataTypes.DECIMAL,
      },
      type: {
        type: DataTypes.STRING,
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
    },
    {
      modelName: 'EcommerceOrderHeader',
      tableName: 'ecommerce_order_headers',
      sequelize,
      createdAt: RECORD_CREATION_DATE_FIELD,
      updatedAt: RECORD_UPDATED_DATE_FIELD,
    }
  );
  return EcommerceOrderHeader;
};
