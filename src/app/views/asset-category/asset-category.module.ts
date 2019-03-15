import { AssetCategoryRoutingModule } from './asset-category-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetCategoryComponent } from './asset-category.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';

@NgModule({
  declarations: [AssetCategoryComponent, AddComponent, EditComponent, DetailComponent],
  imports: [
    CommonModule,
    AssetCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule
  ]
})
export class AssetCategoryModule { }
