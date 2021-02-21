import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { AddCustomer } from './customers.actions';
import { CustomersStateModel, defaults } from './customers.state.model';

@State<CustomersStateModel>({
  name: 'APP_CUSTOMERS',
  defaults,
})
@Injectable()
export class CustomersState {
  @Action(AddCustomer)
  addCustomer(
    ctx: StateContext<CustomersStateModel>,
    action: AddCustomer
  ): void {
    try {
      const state = ctx.getState();

      ctx.patchState({
        customersList: [...state.customersList, action.payload],
      });
    } catch (err) {
      console.log(err);
    }
  }
}
