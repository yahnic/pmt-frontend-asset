import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '404', component: P404Component, data: {title: 'Page 404'}},
  {path: '500', component: P500Component, data: {title: 'Page 500'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login Page'}},
  {path: 'register', component: RegisterComponent, data: { title: 'Register Page'}},
  {path: '', component: DefaultLayoutComponent, data: {title: 'Home'},
    children: [
      { path: 'base', loadChildren: './views/base/base.module#BaseModule' },
      { path: 'buttons', loadChildren: './views/buttons/buttons.module#ButtonsModule' },
      { path: 'charts', loadChildren: './views/chartjs/chartjs.module#ChartJSModule' },
      { path: 'dashboard', loadChildren: './views/dashboard/dashboard.module#DashboardModule' },
      { path: 'icons', loadChildren: './views/icons/icons.module#IconsModule' },
      { path: 'notifications', loadChildren: './views/notifications/notifications.module#NotificationsModule' },
      { path: 'theme', loadChildren: './views/theme/theme.module#ThemeModule' },
      { path: 'widgets', loadChildren: './views/widgets/widgets.module#WidgetsModule' },
      { path: 'accident', loadChildren: './views/accident/accident.module#AccidentModule' },
      { path: 'assignment', loadChildren: './views/assignment/assignment.module#AssignmentModule' },
      { path: 'maintenance', loadChildren: './views/maintenance/maintenance.module#MaintenanceModule' },
      { path: 'offence', loadChildren: './views/offence/offence.module#OffenceModule' },
      { path: 'pmt-waybill', loadChildren: './views/pmt-waybill/pmt-waybill.module#PmtWaybillModule' },
      { path: 'pml-waybill', loadChildren: './views/pml-waybill/pml-waybill.module#PmlWaybillModule' },
      { path: 'profile', loadChildren: './views/profile/profile.module#ProfileModule' },
      { path: 'rating', loadChildren: './views/rating/rating.module#RatingModule' },
      { path: 'schedule', loadChildren: './views/schedule/schedule.module#ScheduleModule' },
      { path: 'spares', loadChildren: './views/spares/spares.module#SparesModule' },
      { path: 'staff', loadChildren: './views/staff/staff.module#StaffModule' },
      { path: 'terminal', loadChildren: './views/terminal/terminal.module#TerminalModule' },
      { path: 'vehicle', loadChildren: './views/vehicle/vehicle.module#VehicleModule' },
      { path: 'bank-register', loadChildren: './views/bank-register/bank-register.module#BankRegisterModule' },
      { path: 'voucher', loadChildren: './views/voucher/voucher.module#VoucherModule' },
      { path: 'voucher-stage', loadChildren: './views/voucher-stage/voucher-stage.module#VoucherStageModule' },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
