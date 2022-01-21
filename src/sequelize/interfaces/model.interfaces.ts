export interface CreationDate {
  recordCreationDate: Date;
}

export interface UpdatedDate {
  recordUpdatedDate: Date;
}

export interface CreationDateUpdatedDate extends CreationDate, UpdatedDate {}

export type CreationDateUpdatedDateGenericType<P> =
  | 'recordCreationDate'
  | 'recordUpdatedDate'
  | P;
export type CreationDateUpdatedDateType =
  | 'recordCreationDate'
  | 'recordUpdatedDate';
