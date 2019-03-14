import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../_services';
import { Offence } from '../../../_models';

@Component({
  selector: 'app-offence-detail',
  templateUrl: './offence-detail.component.html',
  styleUrls: ['./offence-detail.component.scss']
})
export class OffenceDetailComponent implements OnInit {

  offences: Array<Offence>;
  offence: Offence;

  id = '';
  offender_type = ''; // string
  offender_id = '';   // number
  offence_act = '';     // string
  offence_date = ''; // Date
  description = '';  // string
  offence_status = ''; // string
  verdict = ''; // string
  verdict_by = ''; // number
  verdict_date =  ''; // Date
  verdict_remark = ''; // string
  fine =  ''; // number
  discipline =  ''; // string
  suspension = ''; // string
  payment = ''; //

  response: any;
  success = false;
  message = '';

  constructor(private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }

  ngOnInit() {
    const offenceId = window.localStorage.getItem('offenceDetailId');
    if (!offenceId) {
      alert('Invalid action.');
      this.router.navigate(['offence']); // list-offence
      return;
    }
    this.offence = this.utilsService.cleanObject(this.getRecord(offenceId));

    this.id = this.offence.id || '';
    this.offender_type = this.offence.offender_type || '';
    this.offender_id = this.offence.offender_id;
    this.offence_act = this.offence.offence || '';
    this.offence_date = this.offence.offence_date.toString();
    this.description = this.offence.description || '';
    this.offence_status = this.offence.offence_status || '';
    this.verdict = this.offence.verdict || '';
    this.verdict_by = this.offence.verdict_by || '';
    this.verdict_date = this.offence.verdict_date.toString();
    this.verdict_remark = this.offence.verdict_remark || '';
    this.fine = this.offence.fine.toString(10);
    this.discipline = this.offence.discipline || '';
    this.suspension = this.offence.suspension || '';
    this.payment = this.offence.payment || '';

    console.log('\nOffence Name', typeof this.offence, this.offence);
  }
  getRecord(offenceId) {
    console.log('\nOffence Id ', offenceId);
    const storedRecords = window.localStorage.getItem('offence');
    const updated = window.localStorage.getItem('offence_updated');
    if (storedRecords) {
        this.offences = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getTerminal(this.offences, offenceId);
    return t[0];
  }

  offenceEdit(offence: Offence): void {
    window.localStorage.removeItem('offenceEditId');
    window.localStorage.setItem('offenceEditId', offence.id);
    this.router.navigate(['offence/edit']);
  }

  offenceAdd(): void {
    this.router.navigate(['offence/add']);
  }

  goBack() {
    this.router.navigate(['offence']);
  }

}
