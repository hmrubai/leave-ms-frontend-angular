import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../core/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { ProjectBreakdownComponent } from './project-breakdown.component';
import { ProjectBreakdownRoutingModule } from './project-breakdown-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    ProjectBreakdownRoutingModule
  ],
  declarations: [ ProjectBreakdownComponent ]
})
export class ProjectBreakdownModule { }
