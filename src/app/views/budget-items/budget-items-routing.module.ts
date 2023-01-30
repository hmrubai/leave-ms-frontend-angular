import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetItemsComponent } from './budget-items.component';

const routes: Routes = [
  {
    path: 'budget-items',
    component: BudgetItemsComponent,
    data: {
      title: 'Product List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetItemsRoutingModule {}
