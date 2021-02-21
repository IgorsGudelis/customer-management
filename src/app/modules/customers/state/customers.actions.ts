import { CustomerModel } from '../models/customer.model';

export class AddCustomer {
  static readonly type = '[Customers] Add Customer';

  constructor(public payload: CustomerModel) {}
}
export class DeleteCustomer {
  static readonly type = '[Customers] Delete Customer';

  constructor(public payload: string) {}
}
export class EditCustomer {
  static readonly type = '[Customers] Edit Customer';

  constructor(public payload: CustomerModel) {}
}
