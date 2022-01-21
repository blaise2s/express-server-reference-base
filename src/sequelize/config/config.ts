import { Options } from 'sequelize';

const development: Options = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PW,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT || 5432),
  dialect: 'postgres',
  // eslint-disable-next-line no-console
  logging: console.log,
};

const test: Options = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PW,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT || 5432),
  dialect: 'postgres',
  // eslint-disable-next-line no-console
  logging: console.log,
};

const production: Options = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PW,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT || 5432),
  dialect: 'postgres',
  logging: false,
};

export default {
  development,
  test,
  production,
};
