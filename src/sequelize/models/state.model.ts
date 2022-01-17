import { DataTypes, Model, Sequelize } from 'sequelize';

export interface StateAttributes {
  name: string;
  abv: string;
  country: string;
  isstate: boolean;
  islower48: boolean;
  slug: string;
  latitude: number;
  longitude: number;
  population: number;
  area: number;
}

export class State extends Model<StateAttributes> implements StateAttributes {
  name!: string;
  abv!: string;
  country!: string;
  isstate!: boolean;
  islower48!: boolean;
  slug!: string;
  latitude!: number;
  longitude!: number;
  population!: number;
  area!: number;
}

export default (
  sequelize: Sequelize,
  createdAt = false,
  updatedAt = false
): void => {
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
      isstate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      islower48: {
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
    },
    {
      tableName: 'states',
      sequelize,
      createdAt,
      updatedAt,
    }
  );
};
