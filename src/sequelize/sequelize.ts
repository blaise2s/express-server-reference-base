import cls from 'cls-hooked';
import { Model, Options, Sequelize } from 'sequelize';
import config from './config/config';
import initModels from './models';

const briczServerNamespace = cls.createNamespace('briczServerNamespace');
Sequelize.useCLS(briczServerNamespace);

export const sequelize = (): Sequelize => {
  const env = process.env.NODE_ENV || 'development';
  if (env === 'development' || env === 'test' || env === 'production') {
    const options: Options = config[env];
    return new Sequelize(options);
  }
  throw new Error(
    `Sequelize config does not exist for environment ${process.env.NODE_ENV}.`
  );
};

export default (
  modelInitializers?: ((sequelize: Sequelize) => typeof Model)[]
): Sequelize => {
  const sequelizeInstance = sequelize();
  initModels(sequelizeInstance, modelInitializers);
  return sequelizeInstance;
};
