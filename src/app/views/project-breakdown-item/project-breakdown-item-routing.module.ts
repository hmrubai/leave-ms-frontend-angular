import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectBreakdownItemComponent } from './project-breakdown-item.component';

const routes: Routes = [
  {
    path: 'project-breakdown-items/:project_id/:category_id',
    component: ProjectBreakdownItemComponent,
    data: {
      title: 'Breakdown Items'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectBreakdownItemRoutingModule {}
