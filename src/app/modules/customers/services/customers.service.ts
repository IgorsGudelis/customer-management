import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CustomersModule } from '../customers.module';

@Injectable({
  providedIn: CustomersModule,
})
export class CustomersService {
  constructor(private http: HttpClient) {}
}
