import cls from 'cls-hooked';
import { Options, Sequelize } from 'sequelize';
import initUploadModel from './models/upload.model';

const briczServerNamespace = cls.createNamespace('briczServerNamespace');
Sequelize.useCLS(briczServerNamespace);

const defaultOptions: Options = {
  database: 'bricz',
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
};

const sequelize = (options: Options) => new Sequelize(options);

export default (
  options = defaultOptions,
  logging = false,
  createdAt = false,
  updatedAt = false
): Sequelize => {
  const sequelizeInstance = sequelize({
    ...options,
    logging,
  });
  initUploadModel(sequelizeInstance, createdAt, updatedAt);
  return sequelizeInstance;
};
