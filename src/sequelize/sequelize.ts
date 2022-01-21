import cls from 'cls-hooked';
import { Options, Sequelize } from 'sequelize';
import config from './config/config';
import initCommerceProfileModel from './models/commerce-profile.model';
import initScriptModel from './models/script.model';
import initStateModel from './models/state.model';
import initUploadModel from './models/upload.model';

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

export default (): Sequelize => {
  const sequelizeInstance = sequelize();
  const inits = [
    initUploadModel,
    initStateModel,
    initScriptModel,
    initCommerceProfileModel,
  ];
  inits.forEach(init => {
    init(sequelizeInstance);
  });
  return sequelizeInstance;
};
