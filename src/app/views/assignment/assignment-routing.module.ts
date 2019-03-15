import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { AssignmentComponent } from './assignment.component';

const routes: Routes = [
  { path: '', component: AssignmentComponent, data: { title: 'Asset-Rquest Assignment' } },
  { path: 'detail', component: DetailComponent, data: { title: 'Assignment Detail' } },
  { path: 'edit', component: EditComponent, data: { title: 'Assignment Edit' } },
  { path: 'add', component: AddComponent, data: { title: 'Assignment Add' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule { }
