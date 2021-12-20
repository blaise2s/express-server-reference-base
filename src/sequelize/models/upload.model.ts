import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface UploadAttributes {
  id: number;
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
}

export interface UploadCreationAttributes
  extends Optional<UploadAttributes, 'id'> {}

export class Upload
  extends Model<UploadAttributes, UploadCreationAttributes>
  implements UploadAttributes
{
  id!: number;
  destination!: string;
  encoding!: string;
  fieldname!: string;
  filename!: string;
  mimetype!: string;
  originalname!: string;
  path!: string;
  size!: number;
}

export default (
  sequelize: Sequelize,
  createdAt = false,
  updatedAt = false
): void => {
  Upload.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      destination: {
        type: DataTypes.STRING(501),
        allowNull: false,
      },
      encoding: {
        type: DataTypes.STRING(51),
        allowNull: false,
      },
      fieldname: {
        type: DataTypes.STRING(101),
        allowNull: false,
      },
      filename: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      mimetype: {
        type: DataTypes.STRING(51),
        allowNull: false,
      },
      originalname: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(1001),
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'uploads',
      sequelize,
      createdAt,
      updatedAt,
    }
  );
};
