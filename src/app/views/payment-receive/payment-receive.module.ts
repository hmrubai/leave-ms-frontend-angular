import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../core/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { PaymentReceiveComponent } from './payment-receive.component';
import { PaymentReceiveRoutingModule } from './payment-receive-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    PaymentReceiveRoutingModule
  ],
  declarations: [ PaymentReceiveComponent ]
})
export class PaymentReceiveModule { }
