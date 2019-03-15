import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';

import { AssetRoutingModule } from './asset-routing.module';
import { AssetComponent } from './asset.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [AssetComponent, AddComponent, EditComponent, DetailComponent],
  imports: [
    CommonModule,
    AssetRoutingModule,
    ReactiveFormsModule,
    SelectModule,
    FormsModule
  ]

})
export class AssetModule { }
