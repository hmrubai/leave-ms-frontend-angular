import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {SharedModule} from '../../core/shared.module';

import { BudgetCategoryComponent } from './budget-category.component';
import { BudgetCategoryRoutingModule } from './budget-category-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BudgetCategoryRoutingModule
  ],
  declarations: [ BudgetCategoryComponent ]
})
export class BudgetCategoryModule { }
