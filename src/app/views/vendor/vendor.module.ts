import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../core/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { VendorListComponent } from './vendor.component';
import { VendorListRoutingModule } from './vendor-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    VendorListRoutingModule
  ],
  declarations: [ VendorListComponent ]
})
export class VendorListModule { }
