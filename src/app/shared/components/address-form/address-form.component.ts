import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import { AddressModel } from '@shared/models/address.model';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class AddressFormComponent implements OnInit {
  @Input() address: AddressModel;

  readonly ADDRESS_FORM_NAME = 'address';
  readonly CITY_CTRL_NAME = 'city';
  readonly HOUSE_NUMBER_CTRL_NAME = 'houseNumber';
  readonly STREET_CTRL_NAME = 'street';
  readonly ZIP_CODE_CTRL_NAME = 'zipCode';
  form: FormGroup;

  constructor(
    private ctrlContainer: FormGroupDirective,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.ctrlContainer.form;
    this.form.addControl(
      this.ADDRESS_FORM_NAME,
      this.fb.group({
        [this.CITY_CTRL_NAME]: [this.address?.city, [Validators.required]],
        [this.HOUSE_NUMBER_CTRL_NAME]: [
          this.address?.houseNumber,
          [Validators.required],
        ],
        [this.STREET_CTRL_NAME]: [this.address?.street, [Validators.required]],
        [this.ZIP_CODE_CTRL_NAME]: [
          this.address?.zipCode,
          [Validators.required],
        ],
      })
    );
  }
}
