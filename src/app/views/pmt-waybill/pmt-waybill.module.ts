import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmtWaybillRoutingModule } from './pmt-waybill-routing.module';
import { PmtWaybillComponent } from './pmt-waybill.component';

@NgModule({
  declarations: [PmtWaybillComponent],
  imports: [
    CommonModule,
    PmtWaybillRoutingModule
  ]
})
export class PmtWaybillModule { }
