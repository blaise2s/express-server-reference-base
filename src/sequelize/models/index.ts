import { Model, Sequelize } from 'sequelize/dist';
import commerceProfileModel from './commerce-profile.model';
import ecommerceOrderDetailModel from './ecommerce-order-detail.model';
import ecommerceOrderHeaderModel from './ecommerce-order-header.model';
import ecommerceModel from './ecommerce.model';
import geographicFeatureModel from './geographic-feature.model';
import locationModel from './location.model';
import pointOfSaleModel from './point-of-sale.model';
import storeWeeklySaleModel from './store-weekly-sale.model';

export default (
  sequelize: Sequelize,
  modelInitializers?: ((sequelize: Sequelize) => typeof Model)[]
): void => {
  const initializers = modelInitializers || [
    commerceProfileModel,
    ecommerceOrderDetailModel,
    ecommerceOrderHeaderModel,
    ecommerceModel,
    geographicFeatureModel,
    locationModel,
    pointOfSaleModel,
    storeWeeklySaleModel,
  ];
  initializers.forEach(init => {
    init(sequelize);
  });
};
