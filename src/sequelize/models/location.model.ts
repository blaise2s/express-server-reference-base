import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import {
  RECORD_CREATION_DATE_FIELD,
  RECORD_UPDATED_DATE_FIELD,
} from '../constants/table.constants';
import {
  CreationDateUpdatedDate,
  CreationDateUpdatedDateGenericType,
} from '../interfaces/model.interfaces';

export enum FacilityType {
  STORE = 'STORE',
  OUTLET = 'OUTLET',
  DC = 'DC',
  WAREHOUSE = 'WAREHOUSE',
  OTHER = 'OTHER',
}
export const FacilityTypeValues = [
  'STORE',
  'OUTLET',
  'DC',
  'WAREHOUSE',
  'OTHER',
];

export interface LocationAttributes extends CreationDateUpdatedDate {
  id: number;
  facilityId: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  stateProvence: string | null;
  zipCode: string | null;
  countryCode: string | null;
  longitude: number | null;
  latitude: number | null;
  facilityType: FacilityType | null;
  sellableSquareFt: number | null;
  storageSquareFt: number | null;
}

export interface LocationCreationAttributes
  extends Optional<
    LocationAttributes,
    CreationDateUpdatedDateGenericType<'id'>
  > {}

export class Location
  extends Model<LocationAttributes, LocationCreationAttributes>
  implements LocationAttributes
{
  id!: number;
  facilityId!: string | null;
  address1!: string | null;
  address2!: string | null;
  city!: string | null;
  stateProvence!: string | null;
  zipCode!: string | null;
  countryCode!: string | null;
  longitude!: number | null;
  latitude!: number | null;
  facilityType!: FacilityType | null;
  sellableSquareFt!: number | null;
  storageSquareFt!: number | null;
  recordCreationDate!: Date;
  recordUpdatedDate!: Date;
}

export default (sequelize: Sequelize): typeof Location => {
  Location.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      facilityId: {
        field: 'facility_id',
        type: DataTypes.STRING,
      },
      address1: {
        field: 'address_1',
        type: DataTypes.STRING,
      },
      address2: {
        field: 'address_2',
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      stateProvence: {
        field: 'state_prov',
        type: DataTypes.STRING,
      },
      zipCode: {
        field: 'zip_code',
        type: DataTypes.STRING(12),
      },
      countryCode: {
        field: 'country_code',
        type: DataTypes.STRING(10),
      },
      longitude: {
        type: DataTypes.DECIMAL,
      },
      latitude: {
        type: DataTypes.DECIMAL,
      },
      facilityType: {
        field: 'facility_type',
        type: DataTypes.ENUM('STORE', 'OUTLET', 'DC', 'WAREHOUSE', 'OTHER'),
      },
      sellableSquareFt: {
        type: DataTypes.INTEGER,
        field: 'sellable_sq_ft',
      },
      storageSquareFt: {
        type: DataTypes.INTEGER,
        field: 'storage_sq_ft',
      },
      recordCreationDate: {
        field: RECORD_CREATION_DATE_FIELD,
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
      recordUpdatedDate: {
        field: RECORD_UPDATED_DATE_FIELD,
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW'),
      },
    },
    {
      modelName: 'Location',
      tableName: 'locations',
      sequelize,
      createdAt: RECORD_CREATION_DATE_FIELD,
      updatedAt: RECORD_UPDATED_DATE_FIELD,
    }
  );
  return Location;
};
