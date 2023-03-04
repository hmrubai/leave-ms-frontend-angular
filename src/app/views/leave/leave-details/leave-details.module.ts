import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BlockUIModule } from 'ng-block-ui';
import {SharedModule} from '../../../core/shared.module';

import { LeaveDetailsComponent } from './leave-details.component';
import { LeaveDetailsRoutingModule } from './leave-details-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LeaveDetailsRoutingModule,
    BlockUIModule
  ],
  declarations: [ LeaveDetailsComponent ]
})
export class LeaveDetailsModule { }
