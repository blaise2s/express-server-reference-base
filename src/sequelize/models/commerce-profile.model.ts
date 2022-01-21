import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateGenericType,
} from '../interfaces/model.interfaces';

export type KeyValueResult<T> = { [key: string]: T };
export interface CommerceRollup {
  ecomm: number;
  pos: number;
  total: number;
  numStores: number;
}

export enum Analysis {
  State = 'STATE',
  Zip = 'ZIP',
}

export interface Parameters {
  [key: string]: string;
}

export interface CommerceProfileAttributes extends CreationDateUpdatedDate {
  id: number;
  type: Analysis;
  parameters: Parameters;
  result: KeyValueResult<CommerceRollup>;
}

export interface CommerceProfileCreationAttributes
  extends Optional<
    CommerceProfileAttributes,
    CreationDateUpdatedDateGenericType<'id'>
  > {}

export class CommerceProfile
  extends Model<CommerceProfileAttributes, CommerceProfileCreationAttributes>
  implements CommerceProfileAttributes
{
  id!: number;
  type!: Analysis;
  parameters!: Parameters;
  result!: KeyValueResult<CommerceRollup>;
  recordCreationDate!: Date;
  recordUpdatedDate!: Date;
}

export default (sequelize: Sequelize): typeof CommerceProfile => {
  CommerceProfile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM('STATE', 'ZIP'),
        allowNull: false,
      },
      parameters: {
        type: DataTypes.JSONB,
      },
      result: {
        type: DataTypes.JSONB,
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
      modelName: 'CommerceProfile',
      tableName: 'commerce_profile',
      sequelize,
      createdAt: RECORD_CREATION_DATE_FIELD,
      updatedAt: RECORD_UPDATED_DATE_FIELD,
    }
  );
  return CommerceProfile;
};
