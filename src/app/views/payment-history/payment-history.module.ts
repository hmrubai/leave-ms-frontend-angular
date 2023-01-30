import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../core/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { PaymentHistoryComponent } from './payment-history.component';
import { PaymentHistoryRoutingModule } from './payment-history-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    PaymentHistoryRoutingModule
  ],
  declarations: [ PaymentHistoryComponent ]
})
export class PaymentHistoryModule { }
