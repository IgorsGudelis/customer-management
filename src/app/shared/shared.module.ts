import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SHARED_COMPONENTS } from './components';
import { AppMaterialModule } from './modules/app-material/app-material.module';

@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, AppMaterialModule.forRoot()],
  exports: [...SHARED_COMPONENTS],
})
export class SharedModule {}
