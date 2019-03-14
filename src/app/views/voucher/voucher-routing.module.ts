import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoucherComponent } from './voucher.component';
import { VoucherEditComponent } from './voucher-edit/voucher-edit.component';
import { VoucherAddComponent } from './voucher-add/voucher-add.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';

const routes: Routes = [
  {path: '', component: VoucherComponent, data: {title: 'Voucher'}},
  {path: 'edit', component: VoucherEditComponent, data: {title: 'Edit Voucher'}},
  {path: 'add', component: VoucherAddComponent, data: { title: 'Add Voucher' }},
  {path: 'detail', component: VoucherDetailComponent, data: { title: 'Voucher Details' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherRoutingModule { }
