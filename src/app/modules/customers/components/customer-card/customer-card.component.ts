import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CustomerModel } from '../../models/customer.model';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerCardComponent {
  @Input() customer: CustomerModel;
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  onDeleteCustomer(): void {
    this.delete.emit();
  }

  onEditCustomer(): void {
    this.edit.emit();
  }
}
