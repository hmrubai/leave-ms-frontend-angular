import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../core/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { ProjectStatementComponent } from './project-transaction-details.component';
import { ProjectStatementRoutingModule } from './project-transaction-details-routing.module';
import { CommonModule } from '@angular/common';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    ProjectStatementRoutingModule,
    BlockUIModule.forRoot(),
  ],
  declarations: [ ProjectStatementComponent ]
})
export class ProjectStatementModule { }
