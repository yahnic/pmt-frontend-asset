import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';

import { TerminalRoutingModule } from './terminal-routing.module';
import { TerminalComponent } from './terminal.component';
import { TerminalDetailComponent } from './terminal-detail/terminal-detail.component';
import { TerminalAddComponent } from './terminal-add/terminal-add.component';
import { TerminalEditComponent } from './terminal-edit/terminal-edit.component';

@NgModule({
  declarations: [TerminalComponent, TerminalDetailComponent, TerminalAddComponent, TerminalEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TerminalRoutingModule,
    SelectModule

  ]
})
export class TerminalModule { }
