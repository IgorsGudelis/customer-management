import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SHARED_COMPONENTS } from './components';
import { AppMaterialModule } from './modules/app-material/app-material.module';

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule, AppMaterialModule.forRoot()],
  exports: [...SHARED_COMPONENTS],
})
export class SharedModule {}
