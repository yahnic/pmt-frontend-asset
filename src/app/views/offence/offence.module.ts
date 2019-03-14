import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';

import { OffenceRoutingModule } from './offence-routing.module';
import { OffenceComponent } from './offence.component';
import { OffenceAddComponent } from './offence-add/offence-add.component';
import { OffenceEditComponent } from './offence-edit/offence-edit.component';
import { OffenceDetailComponent } from './offence-detail/offence-detail.component';

@NgModule({
  declarations: [OffenceComponent, OffenceAddComponent, OffenceEditComponent, OffenceDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OffenceRoutingModule,
    SelectModule,
  ]
})
export class OffenceModule { }
