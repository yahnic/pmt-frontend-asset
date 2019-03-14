import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SparesComponent } from './spares.component';

const routes: Routes = [
  { path: '', component: SparesComponent, data: { title: 'Spares' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SparesRoutingModule { }
