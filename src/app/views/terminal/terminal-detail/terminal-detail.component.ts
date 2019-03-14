import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../_services';
import { Terminal } from '../../../_models';

@Component({
  selector: 'app-terminal-detail',
  templateUrl: './terminal-detail.component.html',
  styleUrls: ['./terminal-detail.component.scss']
})
export class TerminalDetailComponent implements OnInit {

  terminals: Array<Terminal>;
  terminal: Terminal;

  id = '';
  name = '';
  manager = '';
  phone = '';
  quarter = '';
  city = '';
  county = '';
  address = '';
  longitude = '';
  latitude = '';
  capacity = '';
  is_pml_operational = '';
  is_pmt_operational = '';
  is_pmt_online = '';
  photo = '';
  flw_subaccount = '';

  response: any;
  success = false;
  message = '';

  constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }

  ngOnInit() {
    const terminalId = window.localStorage.getItem('terminalDetailId');
    if (!terminalId) {
      alert('Invalid action.');
      this.router.navigate(['terminal']); // list-terminal
      return;
    }

    this.terminal = this.utilsService.cleanObject(this.getRecord(terminalId));

    this.id = this.terminal.id || '';
    this.name = this.terminal.name || '';
    this.manager = this.terminal.manager;
    this.phone = this.terminal.phone || '';
    this.quarter = this.terminal.quarter || '';
    if (this.utilsService.hasProp(this.terminal, 'city_id')) {
      this.city = this.terminal.city_id.name.toString();
    }
    if (this.utilsService.hasProp(this.terminal, 'county_id')) {
      this.county = this.terminal.county_id.name.toString();
    }
    this.address = this.terminal.address || '';
    if (this.utilsService.hasProp(this.terminal, 'longitude')) {
      this.longitude = this.terminal.longitude.toString();
    }
    if (this.utilsService.hasProp(this.terminal, 'latitude')) {
      this.latitude = this.terminal.latitude.toString();
    }
    this.capacity = this.terminal.capacity.toString() || '';
    if (this.utilsService.hasProp(this.terminal, 'capacity')) {
      this.capacity = this.terminal.capacity.toString();
    }
    if (this.utilsService.hasProp(this.terminal, 'is_pml_operational')) {
      this.is_pml_operational = this.terminal.is_pml_operational.toString();
    }
    if (this.utilsService.hasProp(this.terminal, 'is_pmt_operational')) {
      this.is_pmt_operational = this.terminal.is_pmt_operational.toString();
    }
    if (this.utilsService.hasProp(this.terminal, 'is_pmt_online')) {
      this.is_pmt_online = this.terminal.is_pmt_online.toString();
    }
    this.photo = this.terminal.photo || '';
    if (this.utilsService.hasProp(this.terminal, 'flw_subaccount_id')) {
      this.flw_subaccount = this.terminal.flw_subaccount_id.subaccount_id;
    }

    console.log('\nTerminal Name', typeof this.terminal, this.terminal);
  }

  getRecord(terminalId) {
    console.log('\nTerminal Id ', terminalId);
    const storedRecords = window.localStorage.getItem('terminal');
    const updated = window.localStorage.getItem('terminal_updated');
    if (storedRecords) {
        this.terminals = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getTerminal(this.terminals, terminalId);
    return t[0];
  }

  terminalEdit(terminal: Terminal): void {
    window.localStorage.removeItem('terminalEditId');
    window.localStorage.setItem('terminalEditId', terminal.id);
    this.router.navigate(['terminal/edit']);
  }

  terminalAdd(): void {
    this.router.navigate(['terminal/add']);
  }

  goBack() {
    this.router.navigate(['terminal']);
  }

}
