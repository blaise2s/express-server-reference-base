import { DataTypes, Op } from 'sequelize';
import { Migration } from './umzug';

const TABLE_NAME = 'geographic_features';
const NEW_COLUMN_NAME = 'shape_type';

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.addColumn(TABLE_NAME, NEW_COLUMN_NAME, {
    type: DataTypes.ENUM('STATE', 'ZIP3'),
    allowNull: false,
  });
  queryInterface.bulkUpdate(
    TABLE_NAME,
    { shape_type: 'STATE' },
    {
      id: {
        [Op.regexp]: '[A-Z]{2}',
      },
    }
  );
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn(TABLE_NAME, NEW_COLUMN_NAME);
};
