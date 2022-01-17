import cls from 'cls-hooked';
import { Options, Sequelize } from 'sequelize';
import initScriptModel from './models/script.model';
import initStateModel from './models/state.model';
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
  logging = false,
  options = defaultOptions,
  createdAt = false,
  updatedAt = false
): Sequelize => {
  const sequelizeInstance = sequelize({
    ...options,
    logging,
  });
  const inits = [initUploadModel, initStateModel, initScriptModel];
  inits.forEach(init => {
    init(sequelizeInstance, createdAt, updatedAt);
  });
  return sequelizeInstance;
};
