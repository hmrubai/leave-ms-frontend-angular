import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgSelectModule } from '@ng-select/ng-select';
import {SharedModule} from '../../../core/shared.module';

import { LeavePolicyComponent } from './leave-policy.component';
import { LeavePolicyRoutingModule } from './leave-policy-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    LeavePolicyRoutingModule
  ],
  declarations: [ LeavePolicyComponent ]
})
export class LeavePolicyModule { }
