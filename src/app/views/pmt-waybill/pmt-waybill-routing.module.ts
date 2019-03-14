import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PmtWaybillComponent } from './pmt-waybill.component';

const routes: Routes = [
  { path: '', component: PmtWaybillComponent, data: { title: 'PMT Waybill' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmtWaybillRoutingModule { }
