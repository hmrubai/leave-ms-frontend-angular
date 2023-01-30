import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorListComponent } from './vendor.component';

const routes: Routes = [
  {
    path: 'vendor',
    component: VendorListComponent,
    data: {
      title: 'Vendor List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorListRoutingModule {}
