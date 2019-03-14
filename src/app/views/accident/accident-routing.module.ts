import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccidentComponent } from './accident.component';

const routes: Routes = [
  { path: '', component: AccidentComponent, data: { title: 'Accident' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccidentRoutingModule { }
