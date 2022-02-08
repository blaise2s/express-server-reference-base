import { GeometryType, ShapeType } from '../geographic-feature.model';
import { FacilityType } from '../location.model';
import { isFacilityType, isGeometryType } from './type-guards';

export const facilityType = (from: string): FacilityType => {
  if (isFacilityType(from)) {
    return FacilityType[from];
  }
  return FacilityType.OTHER;
};

export const geometryType = (from: string): GeometryType => {
  if (isGeometryType(from)) {
    return GeometryType[from];
  }
  throw new Error('Unrecognized geometry type');
};

export const stateRegExp = /[A-Z]{2}/;
export const zip3RegExp = /[0-9]{3}/;
export const shapeType = (from: string): ShapeType => {
  if (stateRegExp.test(from)) {
    return ShapeType.STATE;
  }

  if (zip3RegExp.test(from)) {
    return ShapeType.ZIP3;
  }

  throw new Error('Unrecognized shape type');
};
