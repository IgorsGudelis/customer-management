import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { DIALOG_CONFIG } from '@shared/config/constants';
import { Observable } from 'rxjs';

import { CustomerModel } from '../../models/customer.model';
import { CustomersSelectors } from '../../state/customers.selectors';
import {
  ManageCustomerDialogComponent
} from '../manage-customer-dialog/manage-customer-dialog.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent {
  @Select(CustomersSelectors.customersList) customersList$: Observable<
    CustomerModel[]
  >;

  constructor(public dialog: MatDialog) {}

  onAddCustomer(): void {
    this.dialog.open(ManageCustomerDialogComponent, DIALOG_CONFIG);
  }

  onDeleteCustomer(customer: CustomerModel): void {}

  onEditCustomer(customer: CustomerModel): void {
    this.dialog.open(ManageCustomerDialogComponent, {
      ...DIALOG_CONFIG,
      data: customer,
    });
  }
}
