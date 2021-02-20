import { AddressModel } from '@shared/models/address.model';

export interface CustomerModel {
  address: AddressModel;
  email: string;
  fullName: string;
  location: {
    lat: string;
    lng: string;
  };
}
