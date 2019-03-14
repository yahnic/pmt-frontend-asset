import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentComponent } from './assignment.component';

@NgModule({
  declarations: [AssignmentComponent],
  imports: [
    CommonModule,
    AssignmentRoutingModule
  ]
})
export class AssignmentModule { }
