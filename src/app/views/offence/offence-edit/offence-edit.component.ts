import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../_services';
import { ApiResponse, Offence } from '../../../_models';


@Component({
  selector: 'app-offence-edit',
  templateUrl: './offence-edit.component.html',
  styleUrls: ['./offence-edit.component.scss']
})
export class OffenceEditComponent implements OnInit {
  offences: Array<Offence>;
  offence: Offence;

  editForm: FormGroup;
  response: ApiResponse;

  private value = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    const offenceId = window.localStorage.getItem('offenceEditId');
    if (!offenceId) {
      alert('Invalid action.');
      this.router.navigate(['offence']); // list offence
      return;
  }

  this.editForm = this.formBuilder.group({

    offender_type: [''],
    offender_id: [''],   // number
    offence: [''],     // string
    offence_date: [''], // Date
    description: [''],  // string
    offence_status: [''], // string
    verdict: [''], // string
    verdict_by: [''], // number
    verdict_date:  [''], // Date
    verdict_remark: [''], // string
    fine:  [''], // number
    discipline:  [''], // string
    suspension: [''], // string
    payment: [''], // number
    });

    this.offence = this.utilsService.cleanObject(this.getRecord(offenceId));

    this.editForm.get('offender_type').setValue(this.offence.offender_type || '');
    this.editForm.get('offender_id').setValue(this.offence.offender_id || '');
    this.editForm.get('offence').setValue(this.offence.offence || '');
    this.editForm.get('offence_date').setValue(this.offence.offence_date.toString());
    this.editForm.get('description').setValue(this.offence.description || '');
    this.editForm.get('offence_status').setValue(this.offence.offence_status || '');
    this.editForm.get('verdict').setValue(this.offence.verdict || '');
    this.editForm.get('verdict_by').setValue(this.offence.verdict_by || '');
    this.editForm.get('verdict_date').setValue(this.offence.verdict_date.toString());
    this.editForm.get('verdict_remark').setValue(this.offence.verdict_remark || '');
    this.editForm.get('fine').setValue(this.offence.fine.toString(10));
    this.editForm.get('discipline').setValue(this.offence.discipline || '');
    this.editForm.get('suspension').setValue(this.offence.suspension || '');
    this.editForm.get('payment').setValue(this.offence.payment || '');

    console.log('\nOffence Name', typeof this.offence, this.offence);
  }
    onSubmit() {
      const payload = this.editForm.value;
      payload.id = this.offence.id;
      console.log('editForm payload ', payload);
      this.apiService.updateOffence(payload).pipe(first()).subscribe(data => {
            this.response = data;
            this.offence = this.response.payload;
            if (this.response.success) {
              alert('User updated successfully.');
              this.router.navigate(['offence']); // list-offence
              // Update Local Content
             // window.localStorage.setItem('offence', JSON.stringify(this.response.payload));
              window.localStorage.setItem('offence_updated', JSON.stringify(new Date()));
            } else {
              alert(this.response.message);
            }


          },
          error => {
            alert(error);
          });
    }

    getRecord(offenceId) {
      console.log('\nOffence Id ', offenceId);
      const storedRecords = window.localStorage.getItem('offence');
      const updated = window.localStorage.getItem('offence_updated');
      if (storedRecords) {
          this.offences = JSON.parse(storedRecords);
          console.log(`Records retrieved since ${updated}`);
      }
      const t = this.apiService.getOneOffence(this.offences, offenceId);
      return t[0];
    }

    offenceAdd(): void {
      this.router.navigate(['offence/add']);
    }

    goBack() {
      this.router.navigate(['offence']);
    }

    public selected(value: any): void {
      console.log('Selected value is: ', value);
    }

    public removed(value: any): void {
      console.log('Removed value is: ', value);
    }

    public typed(value: any): void {
      console.log('New search input: ', value);
    }

    public refreshValue(value: any): void {
      this.value = value;
    }
  }
