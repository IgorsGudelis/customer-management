import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import {
  GeocodingResponseStatus
} from '@shared/enums/geocoding-response-status.enum';
import { GeocodingLocationModel } from '@shared/models/geocoding-data.model';
import { GoogleMapService } from '@shared/services/google-map.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { AddCustomer, DeleteCustomer, EditCustomer } from './customers.actions';
import { CustomersStateModel, defaults } from './customers.state.model';

@State<CustomersStateModel>({
  name: 'APP_CUSTOMERS',
  defaults,
})
@Injectable()
export class CustomersState {
  constructor(private googleMapService: GoogleMapService) {}

  @Action(AddCustomer)
  addCustomer(
    ctx: StateContext<CustomersStateModel>,
    action: AddCustomer
  ): any {
    const payload = action.payload;
    const state = ctx.getState();
    const address = `${payload.address.street} ${payload.address.houseNumber}, ${payload.address.city}`;
    const id = uuidv4();
    const cb = (location: GeocodingLocationModel) => {
      ctx.patchState({
        customersList: [...state.customersList, { ...payload, id, location }],
      });
    };

    return this.getCustomerGeocoding(address, cb);
  }

  @Action(DeleteCustomer)
  deleteCustomer(
    ctx: StateContext<CustomersStateModel>,
    action: DeleteCustomer
  ): any {
    const payload = action.payload;
    const state = ctx.getState();
    const customers = state.customersList.filter((item) => item.id !== payload);

    ctx.patchState({
      customersList: [...customers],
    });
  }

  @Action(EditCustomer)
  editCustomer(
    ctx: StateContext<CustomersStateModel>,
    action: EditCustomer
  ): any {
    const payload = action.payload;
    const state = ctx.getState();
    const customer = state.customersList.find((item) => item.id === payload.id);
    const customers = state.customersList.filter(
      (item) => item.id !== payload.id
    );
    const cb = (location: GeocodingLocationModel) => {
      ctx.patchState({
        customersList: [...customers, { ...payload, location }],
      });
    };

    if (JSON.stringify(customer.address) !== JSON.stringify(payload.address)) {
      const address = `${payload.address.street} ${payload.address.houseNumber}, ${payload.address.city}`;

      return this.getCustomerGeocoding(address, cb);
    } else {
      ctx.patchState({
        customersList: [...customers, { ...customer, ...payload }],
      });
    }
  }

  private getCustomerGeocoding(
    address: string,
    cb: (location: GeocodingLocationModel) => void
  ): Observable<any> {
    return this.googleMapService.getGeocoding(address).pipe(
      map((geocoding) => ({
        location: geocoding?.results[0]?.geometry?.location,
        status: geocoding?.status,
      })),
      tap((geocodingData) => {
        if (geocodingData.status === GeocodingResponseStatus.ZERO_RESULTS) {
          throw new Error(geocodingData.status);
        }

        cb(geocodingData.location);
      }),
      catchError((error) => throwError(error))
    );
  }
}
