import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import {
  ConfirmDialogComponent
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { DIALOG_CONFIG } from '@shared/config/constants';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { CustomerModel } from '../../models/customer.model';
import { DeleteCustomer } from '../../state/customers.actions';
import { CustomersSelectors } from '../../state/customers.selectors';
import {
  ManageCustomerDialogComponent
} from '../manage-customer-dialog/manage-customer-dialog.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnDestroy {
  @Select(CustomersSelectors.customersList) customersList$: Observable<
    CustomerModel[]
  >;
  private confirmDialogSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnDestroy(): void {
    this.confirmDialogSubscription?.unsubscribe();
  }

  onAddCustomer(): void {
    this.dialog.open(ManageCustomerDialogComponent, DIALOG_CONFIG);
  }

  onDeleteCustomer(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      ...DIALOG_CONFIG,
      data: {
        title: 'Remove Customer',
        message: 'Are you shure?',
      },
    });

    this.confirmDialogSubscription?.unsubscribe();
    this.confirmDialogSubscription = dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap(() => this.store.dispatch(new DeleteCustomer(id)))
      )
      .subscribe(() => {
        this.confirmDialogSubscription.unsubscribe();
        this.snackBar.open('The customer has been successfully removed!');
      });
  }

  onEditCustomer(customer: CustomerModel): void {
    this.dialog.open(ManageCustomerDialogComponent, {
      ...DIALOG_CONFIG,
      data: customer,
    });
  }
}
