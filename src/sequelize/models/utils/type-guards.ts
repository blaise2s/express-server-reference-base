import { Geometry, MultiPolygon, Polygon } from 'geojson';
import { GeometryType, GeometryTypeValues } from '../geographic-feature.model';
import { FacilityType, FacilityTypeValues } from '../location.model';

export const isFacilityType = (value: string): value is FacilityType => {
  return FacilityTypeValues.includes(value);
};

export const isGeometryType = (value: string): value is GeometryType => {
  return GeometryTypeValues.includes(value);
};

export const isMultiPolygon = (value: Geometry): value is MultiPolygon => {
  return (value as MultiPolygon).coordinates.length > 1;
};

export const isPolygon = (value: Geometry): value is Polygon => {
  return (value as MultiPolygon).coordinates.length === 1;
};
