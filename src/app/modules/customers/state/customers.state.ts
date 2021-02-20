import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

import { CustomersStateModel, defaults } from './customers.state.model';

@State<CustomersStateModel>({
  name: 'APP_CUSTOMERS',
  defaults,
})
@Injectable()
export class CustomersState {}
