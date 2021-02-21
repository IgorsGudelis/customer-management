import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import {
  GeocodingResponseStatus
} from '@shared/enums/geocoding-response-status.enum';

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
    const customer = this.form.value;

    this.isSubmitting = true;
    this.store
      .dispatch(new AddCustomer(customer))
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.dialogRef.close();
          this.snackBar.open('Customer has been successfully added!');
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
