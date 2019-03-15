import { AssetComponent } from './asset.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: AssetComponent, data: { title: 'Asset' } },
  { path: 'detail', component: DetailComponent, data: { title: 'Asset Detail' } },
  { path: 'edit', component: EditComponent, data: { title: 'Asset Edit' } },
  { path: 'add', component: AddComponent, data: { title: 'Asset Add' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
