import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../core/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { BudgetItemsComponent } from './budget-items.component';
import { BudgetItemsRoutingModule } from './budget-items-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    BudgetItemsRoutingModule
  ],
  declarations: [ BudgetItemsComponent ]
})
export class BudgetItemsModule { }
