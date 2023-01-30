import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectBreakdownComponent } from './project-breakdown.component';

const routes: Routes = [
  {
    path: 'project-breakdown/:project_id',
    component: ProjectBreakdownComponent,
    data: {
      title: 'Breakdown'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectBreakdownRoutingModule {}
