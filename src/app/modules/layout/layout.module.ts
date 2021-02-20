import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LAYOUT_COMPONENTS } from './components';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [...LAYOUT_COMPONENTS, HeaderComponent],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
