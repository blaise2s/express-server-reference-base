import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateGenericType,
} from '../interfaces/model.interfaces';

export type KeyValueResult<R> = { [key: string]: R };

export enum Analysis {
  State = 'STATE',
  Zip = 'ZIP3',
}

export interface Parameters {
  [key: string]: string;
}
export interface CommerceProfileAttributes<R> extends CreationDateUpdatedDate {
  id: number;
  type: Analysis;
  parameters: Parameters | null;
  result: KeyValueResult<R>;
}

export interface CommerceProfileCreationAttributes<R>
  extends Optional<
    CommerceProfileAttributes<R>,
    CreationDateUpdatedDateGenericType<'id'>
  > {}

export class CommerceProfile<R>
  extends Model<
    CommerceProfileAttributes<R>,
    CommerceProfileCreationAttributes<R>
  >
  implements CommerceProfileAttributes<R>
{
  id!: number;
  type!: Analysis;
  parameters!: Parameters | null;
  result!: KeyValueResult<R>;
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
