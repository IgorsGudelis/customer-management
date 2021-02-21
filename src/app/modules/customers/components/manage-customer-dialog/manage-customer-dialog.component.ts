import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Actions, ofActionErrored, ofActionSuccessful } from '@ngxs/store';

import { CustomerModel } from '../../models/customer.model';
import { AddCustomer } from '../../state/customers.actions';

@UntilDestroy()
@Component({
  selector: 'app-manage-customer-dialog',
  templateUrl: './manage-customer-dialog.component.html',
  styleUrls: ['./manage-customer-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageCustomerDialogComponent implements OnInit {
  readonly FULLNAME_CTRL_NAME = 'fullName';
  readonly EMAIL_CTRL_NAME = 'email';
  readonly ADDRESS_FORM_NAME = 'address';
  readonly CITY_CTRL_NAME = 'city';
  readonly HOUSE_NUMBER_CTRL_NAME = 'houseNumber';
  readonly STREET_CTRL_NAME = 'street';
  readonly ZIP_CODE_CTRL_NAME = 'zipCode';
  form: FormGroup;
  isSubmitting = false;

  constructor(
    public dialogRef: MatDialogRef<ManageCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerModel,
    private actions$: Actions,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.addSubmitSuccessfulHandler();
    this.addSubmitErrorHandler();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  @Dispatch() onSubmit(): AddCustomer {
    const customer = this.form.value;

    this.isSubmitting = true;

    return new AddCustomer(customer);
  }

  private addSubmitSuccessfulHandler(): void {
    this.actions$
      .pipe(ofActionSuccessful(AddCustomer), untilDestroyed(this))
      .subscribe(() => {
        this.isSubmitting = false;
        this.dialogRef.close();
        this.snackBar.open('Customer has been successfully added!');
      });
  }

  private addSubmitErrorHandler(): void {
    this.actions$
      .pipe(ofActionErrored(AddCustomer), untilDestroyed(this))
      .subscribe(() => {
        this.isSubmitting = false;
        this.snackBar.open('Something went wrong! Try again...');
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      [this.FULLNAME_CTRL_NAME]: [],
      [this.EMAIL_CTRL_NAME]: [],
      [this.ADDRESS_FORM_NAME]: this.fb.group({
        [this.CITY_CTRL_NAME]: [],
        [this.HOUSE_NUMBER_CTRL_NAME]: [],
        [this.STREET_CTRL_NAME]: [],
        [this.ZIP_CODE_CTRL_NAME]: [],
      }),
    });
  }
}
