import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmlWaybillRoutingModule } from './pml-waybill-routing.module';
import { PmlWaybillComponent } from './pml-waybill.component';

@NgModule({
  declarations: [PmlWaybillComponent],
  imports: [
    CommonModule,
    PmlWaybillRoutingModule
  ]
})
export class PmlWaybillModule { }
