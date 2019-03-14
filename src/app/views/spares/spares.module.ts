import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparesRoutingModule } from './spares-routing.module';
import { SparesComponent } from './spares.component';

@NgModule({
  declarations: [SparesComponent],
  imports: [
    CommonModule,
    SparesRoutingModule
  ]
})
export class SparesModule { }
