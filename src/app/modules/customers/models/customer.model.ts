import { AddressModel } from '@shared/models/address.model';

export interface CustomerModel {
  address: AddressModel;
  email: string;
  fullName: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  avatar?: string;
}
