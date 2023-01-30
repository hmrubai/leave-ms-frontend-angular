import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentHistoryComponent } from './payment-history.component';

const routes: Routes = [
  {
    path: 'history',
    component: PaymentHistoryComponent,
    data: {
      title: 'Payment Statement'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentHistoryRoutingModule {}
