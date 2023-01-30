import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {SharedModule} from '../../core/shared.module';

import { ItemUnitComponent } from './unit.component';
import { ItemUnitRoutingModule } from './unit-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ItemUnitRoutingModule
  ],
  declarations: [ ItemUnitComponent ]
})
export class ItemUnitModule { }
