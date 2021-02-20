import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LAYOUT_COMPONENTS } from './components';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [...LAYOUT_COMPONENTS],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
