import { AddressModel } from '@shared/models/address.model';

export interface CustomerModel {
  address: AddressModel;
  avatar?: string;
  location?: {
    lat: string;
    lng: string;
  };
  email: string;
  fullName: string;
  id?: string;
}
