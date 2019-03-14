import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';

@NgModule({
  declarations: [VehicleComponent],
  imports: [
    CommonModule,
    VehicleRoutingModule
  ]
})
export class VehicleModule { }
