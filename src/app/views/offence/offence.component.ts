import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services';
import { Router } from '@angular/router';
import { Offence, ApiResponse } from '../../_models';

@Component({
  selector: 'app-offence',
  templateUrl: './offence.component.html',
  styleUrls: ['./offence.component.scss']
})
export class OffenceComponent implements OnInit {

  response: any;
  success = false;
  message = '';
  offences: Array<Offence>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.offenceRetrieve();
    const storedRecords = window.localStorage.getItem('offence');
    const updated = window.localStorage.getItem('offence_updated');
    if (storedRecords && updated) {
        this.offences = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    } else {
      this.offenceRetrieve();
    }
  }

  offenceRetrieve(): void {
    this.apiService.getOffence().subscribe(data => {
      this.response = data;
      console.log(this.response);
      this.offences = this.response.payload;
      this.success = this.response.success;
      this.message = this.response.message;
      if (this.response.success) {
        window.localStorage.setItem('offence', JSON.stringify(this.response.payload));
        window.localStorage.setItem('offence_updated', JSON.stringify(new Date()));
      }
    });
  }

  offenceDetail(offence: Offence): void {
    window.localStorage.removeItem('offenceDetailId');
    window.localStorage.setItem('offenceDetailId', offence.id);
    this.router.navigate(['offence/detail'])
      .then(nav => { console.log(nav); }, err => {console.log(err); });
    console.log('Navigating to offence detail');
    return;
  }

  offenceDelete(offence: Offence): void {
    this.apiService.deleteOffence(offence.id).subscribe( data => {
        this.offences = this.offences.filter(i => i.id !== offence.id);
        window.localStorage.setItem('offence', JSON.stringify(this.offences));
      });
  }

  offenceEdit(offence: Offence): void {
    window.localStorage.removeItem('offenceEditId');
    window.localStorage.setItem('offenceEditId', offence.id);
    this.router.navigate(['offence/edit']);
  }

  offenceAdd(): void {
    this.router.navigate(['offence/add']);
  }
}
