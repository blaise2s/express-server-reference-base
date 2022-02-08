import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateGenericType,
} from '../interfaces/model.interfaces';

export interface EcommerceOrderDetailAttributes
  extends CreationDateUpdatedDate {
  id: number;
  orderId: number;
  sku: number;
  quantity: number | null;
  warehouse: string | null;
}

export interface EcommerceOrderDetailCreationAttributes
  extends Optional<
    EcommerceOrderDetailAttributes,
    CreationDateUpdatedDateGenericType<'id'>
  > {}

export class EcommerceOrderDetail
  extends Model<
    EcommerceOrderDetailAttributes,
    EcommerceOrderDetailCreationAttributes
  >
  implements EcommerceOrderDetailAttributes
{
  id!: number;
  orderId!: number;
  sku!: number;
  quantity!: number | null;
  warehouse!: string | null;
  recordCreationDate!: Date;
  recordUpdatedDate!: Date;
}

export default (sequelize: Sequelize): typeof EcommerceOrderDetail => {
  EcommerceOrderDetail.init(
    {
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
    },
    {
      modelName: 'EcommerceOrderDetail',
      tableName: 'ecommerce_order_details',
      sequelize,
      createdAt: RECORD_CREATION_DATE_FIELD,
      updatedAt: RECORD_UPDATED_DATE_FIELD,
    }
  );
  return EcommerceOrderDetail;
};
