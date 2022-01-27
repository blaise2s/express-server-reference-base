import { Sequelize } from 'sequelize/dist';
import commerceProfileModel from './commerce-profile.model';
import ecommerceModel from './ecommerce.model';

export default (sequelize: Sequelize): void => {
  const inits = [commerceProfileModel, ecommerceModel];
  inits.forEach(init => {
    init(sequelize);
  });
};
