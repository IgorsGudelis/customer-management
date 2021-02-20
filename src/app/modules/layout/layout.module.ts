import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AppMaterialModule
} from '@shared/modules/app-material/app-material.module';

import { LAYOUT_COMPONENTS } from './components';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [...LAYOUT_COMPONENTS],
  imports: [CommonModule, LayoutRoutingModule, AppMaterialModule.forRoot()],
})
export class LayoutModule {}
