import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffenceComponent } from './offence.component';

const routes: Routes = [
  { path: '', component: OffenceComponent, data: { title: 'Offence' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffenceRoutingModule { }
