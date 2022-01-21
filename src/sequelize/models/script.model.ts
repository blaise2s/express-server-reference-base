import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateGenericType,
} from '../interfaces/model.interfaces';

export interface ScriptArg {
  name: string;
  description: string;
  argKey: string;
}
export interface ScriptAttributes extends CreationDateUpdatedDate {
  id: number;
  name: string;
  description: string;
  args: ScriptArg[];
}

export interface ScriptCreationAttributes
  extends Optional<
    ScriptAttributes,
    CreationDateUpdatedDateGenericType<'id'>
  > {}

export class Script
  extends Model<ScriptAttributes, ScriptCreationAttributes>
  implements ScriptAttributes
{
  id!: number;
  name!: string;
  description!: string;
  args!: ScriptArg[];
  recordCreationDate!: Date;
  recordUpdatedDate!: Date;
}

export default (sequelize: Sequelize): typeof Script => {
  Script.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      args: {
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
      modelName: 'Script',
      tableName: 'scripts',
      sequelize,
      createdAt: RECORD_CREATION_DATE_FIELD,
      updatedAt: RECORD_UPDATED_DATE_FIELD,
    }
  );
  return Script;
};
