import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentComponent } from './assignment.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [AssignmentComponent, AddComponent, EditComponent, DetailComponent],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule
  ]
})
export class AssignmentModule { }
