import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageContentComponent } from './components';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PageContentComponent,
    children: [
      {
        path: 'customers',
        loadChildren: () =>
          import('../customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/customers',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
