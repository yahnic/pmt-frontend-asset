import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services';
import { Router } from '@angular/router';
import { Terminal, ApiResponse } from '../../_models';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  response: any;
  success = false;
  message = '';
  terminals: Array<Terminal>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    const storedRecords = window.localStorage.getItem('terminal');
    const updated = window.localStorage.getItem('terminal_updated');
    if (storedRecords && updated) {
        this.terminals = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    } else {
      this.terminalRetrieve();
    }
  }

  terminalRetrieve(): void {
    this.apiService.retrieveTerminal().subscribe(data => {
      this.response = data;
      this.terminals = this.response.payload;
      this.success = this.response.success;
      this.message = this.response.message;
      if (this.response.success) {
        window.localStorage.setItem('terminal', JSON.stringify(this.response.payload));
        window.localStorage.setItem('terminal_updated', JSON.stringify(new Date()));
      }
    });
  }

  terminalDetail(terminal: Terminal): void {
    window.localStorage.removeItem('terminalDetailId');
    window.localStorage.setItem('terminalDetailId', terminal.id);
    this.router.navigate(['terminal/detail'])
      .then(nav => { console.log(nav); }, err => {console.log(err); });
    console.log('Navigating to terminal detail');
    return;
  }

  terminalDelete(terminal: Terminal): void {
    this.apiService.deleteTerminal(terminal.id).subscribe( data => {
        this.terminals = this.terminals.filter(i => i.id !== terminal.id);
        window.localStorage.setItem('terminal', JSON.stringify(this.terminals));
      });
  }

  terminalEdit(terminal: Terminal): void {
    window.localStorage.removeItem('terminalEditId');
    window.localStorage.setItem('terminalEditId', terminal.id);
    this.router.navigate(['terminal/edit']);
  }

  terminalAdd(): void {
    this.router.navigate(['terminal/add']);
  }
}
