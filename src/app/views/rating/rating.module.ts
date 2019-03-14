import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { RatingComponent } from './rating.component';

@NgModule({
  declarations: [RatingComponent],
  imports: [
    CommonModule,
    RatingRoutingModule
  ]
})
export class RatingModule { }
