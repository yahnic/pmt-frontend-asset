import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';

import { VoucherStageRoutingModule } from './voucher-stage-routing.module';
import { VoucherStageComponent } from './voucher-stage.component';
import { VoucherStageDetailComponent } from './voucher-stage-detail/voucher-stage-detail.component';
import { VoucherStageEditComponent } from './voucher-stage-edit/voucher-stage-edit.component';
import { VoucherStageAddComponent } from './voucher-stage-add/voucher-stage-add.component';

@NgModule({
  declarations: [VoucherStageComponent, VoucherStageDetailComponent, VoucherStageEditComponent, VoucherStageAddComponent],
  imports: [
    CommonModule,
    VoucherStageRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule
  ]
})
export class VoucherStageModule { }
