import { AddressModel } from '@shared/models/address.model';
import { GeocodingLocationModel } from '@shared/models/geocoding-data.model';

export interface CustomerModel {
  address: AddressModel;
  avatar?: string;
  location?: GeocodingLocationModel;
  email: string;
  fullName: string;
  id?: string;
}
