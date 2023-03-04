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
        path: 'master-settings',
        loadChildren: () => import('./views/master-settings/designation/designation.module').then(m => m.DesignationModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'master-settings',
        loadChildren: () => import('./views/master-settings/department/department.module').then(m => m.DepartmentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'master-settings',
        loadChildren: () => import('./views/master-settings/fiscal-year/fiscal-year.module').then(m => m.FiscalYearModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'master-settings',
        loadChildren: () => import('./views/master-settings/leave-policy/leave-policy.module').then(m => m.LeavePolicyModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'master-settings',
        loadChildren: () => import('./views/master-settings/employment-type/employment-type.module').then(m => m.EmploymentTypeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'master-settings',
        loadChildren: () => import('./views/master-settings/leave-balance-settings/leave-balance-settings.module').then(m => m.LeaveBalanceSettingsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'master-settings',
        loadChildren: () => import('./views/master-settings/employee/employee.module').then(m => m.EmployeeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'leave',
        loadChildren: () => import('./views/leave/employee-leave-balance/employee-leave-balance.module').then(m => m.EmployeeLeaveBalanceListModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'leave',
        loadChildren: () => import('./views/leave/approval-work-flow-setup/approval-work-flow-setup.module').then(m => m.ApprovalWorkFlowSetupModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'leave',
        loadChildren: () => import('./views/leave/apply-for-leave/apply-for-leave.module').then(m => m.ApplyForLeaveModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'leave',
        loadChildren: () => import('./views/leave/leave-details/leave-details.module').then(m => m.LeaveDetailsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'calendar',
        loadChildren: () => import('./views/calendar/day-type/day-type.module').then(m => m.DayTypeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'calendar',
        loadChildren: () => import('./views/calendar/work-day-setup/work-day-setup.module').then(m => m.WorkDaySetupModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'calendar',
        loadChildren: () => import('./views/calendar/yearly-calendar/yearly-calendar.module').then(m => m.YearlyCalendarModule),
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
