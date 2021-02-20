import { Component, OnInit } from '@angular/core';

import { CustomerModel } from '../../models/customer.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  customers: CustomerModel[] = Array(9).fill({
    address: {
      city: 'Minsk',
      houseNumber: '12',
      street: 'Lozinskayay',
      zipCode: '123',
    },
    fullName: 'Bob',
    email: 'bob@gmail.com',
    coordinates: {
      lat: '1212',
      lng: '23232',
    },
  });
  // customers = [];

  constructor() {}

  ngOnInit(): void {}

  onAddCustomer(): void {}

  onDeleteCustomer(customer: CustomerModel): void {}

  onEditCustomer(customer: CustomerModel): void {}
}
