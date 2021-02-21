import { Selector } from '@ngxs/store';

import { CustomerModel } from '../models/customer.model';
import { CustomersState } from './customers.state';
import { CustomersStateModel } from './customers.state.model';

export class CustomersSelectors {
  @Selector([CustomersState])
  static customersList(state: CustomersStateModel): CustomerModel[] {
    return state.customersList;
  }
}
