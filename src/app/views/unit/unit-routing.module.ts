import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemUnitComponent } from './unit.component';

const routes: Routes = [
  {
    path: 'item-unit',
    component: ItemUnitComponent,
    data: {
      title: 'Item Unit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemUnitRoutingModule {}
