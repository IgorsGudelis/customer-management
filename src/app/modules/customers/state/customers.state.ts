import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import {
  GeocodingResponseStatus
} from '@shared/enums/geocoding-response-status.enum';
import { GoogleMapService } from '@shared/services/google-map.service';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AddCustomer } from './customers.actions';
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

    return this.googleMapService.getGeocoding(address).pipe(
      map((geocoding) => ({
        location: geocoding?.results[0]?.geometry?.location,
        status: geocoding?.status,
      })),
      tap((geocodingData) => {
        if (geocodingData.status === GeocodingResponseStatus.ZERO_RESULTS) {
          throw new Error(geocodingData.status);
        }

        ctx.patchState({
          customersList: [
            ...state.customersList,
            { ...payload, location: geocodingData.location },
          ],
        });
      }),
      catchError((error) => throwError(error))
    );
  }
}
