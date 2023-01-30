import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetCategoryComponent } from './budget-category.component';

const routes: Routes = [
  {
    path: 'budget-category',
    component: BudgetCategoryComponent,
    data: {
      title: 'Budget Category'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetCategoryRoutingModule {}
