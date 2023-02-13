import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgSelectModule } from '@ng-select/ng-select';
import {SharedModule} from '../../../core/shared.module';

import { EmployeeLeaveBalanceListComponent } from './employee-leave-balance.component';
import { EmployeeLeaveBalanceListRoutingModule } from './employee-leave-balance-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    EmployeeLeaveBalanceListRoutingModule
  ],
  declarations: [ EmployeeLeaveBalanceListComponent ]
})
export class EmployeeLeaveBalanceListModule { }