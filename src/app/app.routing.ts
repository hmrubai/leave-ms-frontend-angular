import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { MasterLoginComponent } from './views/master-login/master-login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: MasterLoginComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/master-login/master-login.module').then(m => m.MasterLoginModule)
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'master-settings',
        loadChildren: () => import('./views/master-settings/company/company.module').then(m => m.CompanyModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'master-settings',
        loadChildren: () => import('./views/master-settings/branch/branch.module').then(m => m.BranchModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      }
      /*{
        path: 'master-setting',
        loadChildren: () => import('./views/budget-category/budget-category.module').then(m => m.BudgetCategoryModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'master-setting',
        loadChildren: () => import('./views/unit/unit.module').then(m => m.ItemUnitModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'master-setting',
        loadChildren: () => import('./views/budget-items/budget-items.module').then(m => m.BudgetItemsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'master-setting',
        loadChildren: () => import('./views/vendor/vendor.module').then(m => m.VendorListModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'project',
        loadChildren: () => import('./views/project/project.module').then(m => m.ProjectModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'project',
        loadChildren: () => import('./views/project-breakdown/project-breakdown.module').then(m => m.ProjectBreakdownModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'project',
        loadChildren: () => import('./views/project-breakdown-item/project-breakdown-item.module').then(m => m.ProjectBreakdownItemModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'transaction',
        loadChildren: () => import('./views/payment-receive/payment-receive.module').then(m => m.PaymentReceiveModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'transaction',
        loadChildren: () => import('./views/disburse-payment/disburse-payment.module').then(m => m.DisbursePaymentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'transaction',
        loadChildren: () => import('./views/project-transaction-details/project-transaction-details.module').then(m => m.ProjectStatementModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'transaction',
        loadChildren: () => import('./views/payment-history/payment-history.module').then(m => m.PaymentHistoryModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard-sample',
        loadChildren: () => import('./views/dashboard-sample/dashboard-sample.module').then(m => m.DashboardSampleModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule),
        canActivate: [AuthGuard]
      }*/
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
