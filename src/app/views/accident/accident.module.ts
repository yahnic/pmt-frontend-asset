import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccidentRoutingModule } from './accident-routing.module';
import { AccidentComponent } from './accident.component';

@NgModule({
  declarations: [AccidentComponent],
  imports: [
    CommonModule,
    AccidentRoutingModule
  ]
})
export class AccidentModule { }
