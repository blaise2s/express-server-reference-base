import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateGenericType,
} from '../interfaces/model.interfaces';

export interface StoreWeeklySaleAttributes extends CreationDateUpdatedDate {
  id: number;
  locationId: number;
  itemId: number;
  date: Date | null;
  quantity: number | null;
  week: number | null;
}

export interface StoreWeeklySaleCreationAttributes
  extends Optional<
    StoreWeeklySaleAttributes,
    CreationDateUpdatedDateGenericType<'id'>
  > {}

export class StoreWeeklySale
  extends Model<StoreWeeklySaleAttributes, StoreWeeklySaleCreationAttributes>
  implements StoreWeeklySaleAttributes
{
  id!: number;
  locationId!: number;
  itemId!: number;
  date!: Date | null;
  quantity!: number | null;
  week!: number | null;
  recordCreationDate!: Date;
  recordUpdatedDate!: Date;
}

export default (sequelize: Sequelize): typeof StoreWeeklySale => {
  StoreWeeklySale.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      locationId: {
        field: 'location_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      itemId: {
        field: 'item_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
      },
      quantity: {
        type: DataTypes.DECIMAL,
      },
      week: {
        type: DataTypes.INTEGER,
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
      modelName: 'StoreWeeklySale',
      tableName: 'store_weekly_sales',
      sequelize,
      createdAt: RECORD_CREATION_DATE_FIELD,
      updatedAt: RECORD_UPDATED_DATE_FIELD,
    }
  );
  return StoreWeeklySale;
};
