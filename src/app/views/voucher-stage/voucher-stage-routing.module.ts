import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoucherStageComponent } from './voucher-stage.component';
import { VoucherStageAddComponent } from './voucher-stage-add/voucher-stage-add.component';
import { VoucherStageEditComponent } from './voucher-stage-edit/voucher-stage-edit.component';
import { VoucherStageDetailComponent } from './voucher-stage-detail/voucher-stage-detail.component';

const routes: Routes = [
  {path: '', component: VoucherStageComponent, data: {title: 'Voucher stage'}},
  {path: 'edit', component: VoucherStageEditComponent, data: {title: 'Edit Voucher Stage'}},
  {path: 'add', component: VoucherStageAddComponent, data: { title: 'Add Voucher Stage' }},
  {path: 'detail', component: VoucherStageDetailComponent, data: { title: 'Voucher Details' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherStageRoutingModule { }
