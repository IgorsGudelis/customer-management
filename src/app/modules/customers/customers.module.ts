import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppMaterialModule } from '@shared/modules/app-material/app-material.module';

import { CUSTOMERS_COMPONENTS } from './components';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersState } from './state/customers.state';

@NgModule({
  declarations: [...CUSTOMERS_COMPONENTS],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    NgxsModule.forFeature([CustomersState]),
    AppMaterialModule.forRoot(),
  ],
})
export class CustomersModule {}
