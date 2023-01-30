import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisbursePaymentComponent } from './disburse-payment.component';

const routes: Routes = [
  {
    path: 'disburse',
    component: DisbursePaymentComponent,
    data: {
      title: 'Disbursement'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisbursePaymentRoutingModule {}
