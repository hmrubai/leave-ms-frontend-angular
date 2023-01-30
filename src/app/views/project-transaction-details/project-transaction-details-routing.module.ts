import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectStatementComponent } from './project-transaction-details.component';

const routes: Routes = [
  {
    path: 'statement',
    component: ProjectStatementComponent,
    data: {
      title: 'Project Summary'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectStatementRoutingModule {}
