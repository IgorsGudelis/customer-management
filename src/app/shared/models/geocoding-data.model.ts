import {
  GeocodingResponseStatus
} from '@shared/enums/geocoding-response-status.enum';

export interface GeocodingLocationModel {
  lat: string;
  lng: string;
}

export interface GeocodingResponseDataModel {
  location: GeocodingLocationModel;
  status: GeocodingResponseStatus;
}
