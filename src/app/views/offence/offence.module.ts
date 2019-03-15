import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffenceRoutingModule } from './offence-routing.module';
import { OffenceComponent } from './offence.component';

@NgModule({
  declarations: [OffenceComponent],
  imports: [
    CommonModule,
    OffenceRoutingModule
  ]
})
export class OffenceModule { }
