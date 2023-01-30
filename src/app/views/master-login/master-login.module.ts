import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {SharedModule} from '../../core/shared.module';

import { MasterLoginComponent } from './master-login.component';
import { MasterLoginRoutingModule } from './master-login-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MasterLoginRoutingModule,
    // ChartsModule,
    // BsDropdownModule,
    // ButtonsModule.forRoot(),
  ],
  declarations: [ MasterLoginComponent ]
})
export class MasterLoginModule { }
