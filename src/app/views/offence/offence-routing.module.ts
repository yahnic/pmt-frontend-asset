import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffenceComponent } from './offence.component';
import { OffenceAddComponent } from './offence-add/offence-add.component';
import { OffenceEditComponent } from './offence-edit/offence-edit.component';
import { OffenceDetailComponent } from './offence-detail/offence-detail.component';

const routes: Routes = [
  { path: '', component: OffenceComponent, data: { title: 'Offence' } },
  { path: 'add', component: OffenceAddComponent, data: { title: 'Add Offence' } },
  { path: 'edit', component: OffenceEditComponent, data: { title: 'Edit Offence' } },
  { path: 'detail', component: OffenceDetailComponent, data: { title: 'Offence Details' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffenceRoutingModule { }
