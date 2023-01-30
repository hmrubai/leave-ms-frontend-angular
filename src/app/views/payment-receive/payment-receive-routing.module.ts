import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentReceiveComponent } from './payment-receive.component';

const routes: Routes = [
  {
    path: 'receive',
    component: PaymentReceiveComponent,
    data: {
      title: 'Payment Receive'
    }
  },
  {
    path: 'receive/:project_id/:item_type_id',
    component: PaymentReceiveComponent,
    data: {
      title: 'Payment Receive'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentReceiveRoutingModule {}
