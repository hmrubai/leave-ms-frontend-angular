import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../core/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { DisbursePaymentComponent } from './disburse-payment.component';
import { DisbursePaymentRoutingModule } from './disburse-payment-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    DisbursePaymentRoutingModule
  ],
  declarations: [ DisbursePaymentComponent ]
})
export class DisbursePaymentModule { }
