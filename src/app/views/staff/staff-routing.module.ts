import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './staff.component';

const routes: Routes = [
  { path: '', component: StaffComponent, data: { title: 'Staff' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
