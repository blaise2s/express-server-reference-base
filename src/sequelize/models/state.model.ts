import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateType,
} from '../interfaces/model.interfaces';

export interface StateAttributes extends CreationDateUpdatedDate {
  name: string;
  abv: string;
  country: string;
  isState: boolean;
  isLower48: boolean;
  slug: string;
  latitude: number;
  longitude: number;
  population: number;
  area: number;
}

export interface StateCreationAttributes
  extends Optional<StateAttributes, CreationDateUpdatedDateType> {}

export class State
  extends Model<StateAttributes, StateAttributes>
  implements StateAttributes
{
  name!: string;
  abv!: string;
  country!: string;
  isState!: boolean;
  isLower48!: boolean;
  slug!: string;
  latitude!: number;
  longitude!: number;
  population!: number;
  area!: number;
  recordCreationDate!: Date;
  recordUpdatedDate!: Date;
}

export default (sequelize: Sequelize): typeof State => {
  State.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      abv: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        primaryKey: true,
      },
      country: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        primaryKey: true,
      },
      isState: {
        field: 'is_state',
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isLower48: {
        field: 'is_lower_48',
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      population: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      area: {
        type: DataTypes.FLOAT,
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
      modelName: 'State',
      tableName: 'states',
      sequelize,
      createdAt: RECORD_CREATION_DATE_FIELD,
      updatedAt: RECORD_UPDATED_DATE_FIELD,
    }
  );
  return State;
};
