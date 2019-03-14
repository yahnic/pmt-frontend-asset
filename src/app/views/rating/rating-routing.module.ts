import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatingComponent } from './rating.component';

const routes: Routes = [
  { path: '', component: RatingComponent, data: { title: 'Rating' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatingRoutingModule { }
