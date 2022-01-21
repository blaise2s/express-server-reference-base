import { SequelizeStorage, Umzug } from 'umzug';
import { sequelize } from '../sequelize';

const sequelizeInstance = sequelize();

export const migrator = new Umzug({
  migrations: {
    glob: ['*.ts', { cwd: __dirname, ignore: 'umzug.ts' }],
  },
  context: sequelizeInstance,
  storage: new SequelizeStorage({
    sequelize: sequelizeInstance,
    tableName: 'sequelize_meta',
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
