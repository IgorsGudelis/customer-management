import { CustomerModel } from '../models/customer.model';

export interface CustomersStateModel {
  customersList: CustomerModel[];
}

export const defaults: CustomersStateModel = {
  customersList: [],
};
