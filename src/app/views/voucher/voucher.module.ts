import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { VoucherRoutingModule } from './voucher-routing.module';
import { VoucherComponent } from './voucher.component';
import { VoucherAddComponent } from './voucher-add/voucher-add.component';
import { VoucherEditComponent } from './voucher-edit/voucher-edit.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';


@NgModule({
  declarations: [VoucherComponent, VoucherAddComponent, VoucherEditComponent, VoucherDetailComponent],
  imports: [
    CommonModule,
    VoucherRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class VoucherModule { }
