import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import {
  GeocodingResponseStatus
} from '@shared/enums/geocoding-response-status.enum';
import { InputHelper } from '@shared/helpers/trim-ctrls-value.helper';
import { AddressModel } from '@shared/models/address.model';

import { CustomerModel } from '../../models/customer.model';
import { AddCustomer, EditCustomer } from '../../state/customers.actions';

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
  form: FormGroup;
  isSubmitting = false;

  get address(): AddressModel {
    return this.data?.address;
  }

  constructor(
    public dialogRef: MatDialogRef<ManageCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerModel,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    InputHelper.trimCtrlsValue(this.form);

    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();

      return;
    }

    const customer = { ...this.form.value, id: this.data?.id };
    const action = this.data ? EditCustomer : AddCustomer;
    const successfulMessage = `The customer has been successfully ${
      this.data ? 'modified' : 'added'
    }!`;

    this.isSubmitting = true;
    this.store
      .dispatch(new action(customer))
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.dialogRef.close();
          this.snackBar.open(successfulMessage);
        },
        (error) => {
          this.isSubmitting = false;
          this.cdr.markForCheck();

          switch (error.message) {
            case GeocodingResponseStatus.ZERO_RESULTS: {
              this.snackBar.open('A non-existent address!');
              break;
            }

            default: {
              this.snackBar.open('Something went wrong! Try again...');
            }
          }
        }
      );
  }

  private createForm(): void {
    this.form = this.fb.group({
      [this.FULLNAME_CTRL_NAME]: [this.data?.fullName, [Validators.required]],
      [this.EMAIL_CTRL_NAME]: [
        this.data?.email,
        [Validators.required, Validators.email],
      ],
    });
  }
}
