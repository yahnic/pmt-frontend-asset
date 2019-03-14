import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PmlWaybillComponent } from './pml-waybill.component';

const routes: Routes = [
  { path: '', component: PmlWaybillComponent, data: { title: 'PML Waybill' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmlWaybillRoutingModule { }
