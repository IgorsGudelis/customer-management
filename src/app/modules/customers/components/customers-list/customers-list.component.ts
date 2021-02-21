import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
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
export class CustomersListComponent implements OnInit {
  @Select(CustomersSelectors.customersList) customersList$: Observable<
    CustomerModel[]
  >;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onAddCustomer(): void {
    const dialogRef = this.dialog.open(ManageCustomerDialogComponent, {
      width: '100%',
      maxWidth: '600px',
      data: { fullName: 'Bob' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  onDeleteCustomer(customer: CustomerModel): void {}

  onEditCustomer(customer: CustomerModel): void {}
}
