import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../core/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { ProjectBreakdownItemComponent } from './project-breakdown-item.component';
import { ProjectBreakdownItemRoutingModule } from './project-breakdown-item-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    ProjectBreakdownItemRoutingModule
  ],
  declarations: [ ProjectBreakdownItemComponent ]
})
export class ProjectBreakdownItemModule { }
