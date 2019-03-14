import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../_services';
import { Terminal, ApiResponse, SelectOptionInterface } from '../../../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offence-add',
  templateUrl: './offence-add.component.html',
  styleUrls: ['./offence-add.component.scss']
})
export class OffenceAddComponent implements OnInit {
  addForm: FormGroup;

  private value = {};
  
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
    offender_type: [''], // string
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
  }

  onSubmit() {
    const payload = this.addForm.value;
    // console.log('Form input ', payload);
    this.apiService.createOffence(payload).subscribe( (response: any) => {
      console.log(response);
      if (response.success) {
        window.localStorage.setItem('offenceDetailId', response.payload.id);
        this.router.navigate(['offence/detail']);
      } else {
        console.log(response.message);
      }
        this.router.navigate(['offence']);
      });
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
