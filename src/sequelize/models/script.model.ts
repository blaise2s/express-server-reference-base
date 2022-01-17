import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface ScriptArg {
  name: string;
  placeholderText: string;
}

export interface ScriptAttributes {
  id: number;
  name: string;
  description: string;
  numArgs: number;
  args: ScriptArg[];
}

export interface ScriptCreationAttributes
  extends Optional<ScriptAttributes, 'id'> {}

export class Script extends Model<ScriptAttributes, ScriptCreationAttributes> {
  id!: number;
  name!: string;
  description!: string;
  numArgs!: number;
  args!: ScriptArg[];
}

export default (
  sequelize: Sequelize,
  createdAt = false,
  updatedAt = false
): void => {
  Script.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(501),
        allowNull: false,
      },
      numArgs: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      args: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      tableName: 'scripts',
      sequelize,
      createdAt,
      updatedAt,
    }
  );
};
