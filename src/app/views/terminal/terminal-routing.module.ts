import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerminalComponent } from './terminal.component';
import { TerminalDetailComponent } from './terminal-detail/terminal-detail.component';
import { TerminalEditComponent } from './terminal-edit/terminal-edit.component';
import { TerminalAddComponent } from './terminal-add/terminal-add.component';

const routes: Routes = [
  { path: '', component: TerminalComponent, data: { title: 'Terminal' } },
  { path: 'detail', component: TerminalDetailComponent, data: { title: 'Terminal Detail' } },
  { path: 'edit', component: TerminalEditComponent, data: { title: 'Terminal Edit' } },
  { path: 'add', component: TerminalAddComponent, data: { title: 'Terminal Add' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminalRoutingModule { }
