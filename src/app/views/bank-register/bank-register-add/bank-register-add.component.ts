import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../_services';
import { Terminal, ApiResponse, SelectOptionInterface } from '../../../_models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bank-register-add',
  templateUrl: './bank-register-add.component.html',
  styleUrls: ['./bank-register-add.component.scss']
})
export class BankRegisterAddComponent implements OnInit {

  addForm: FormGroup;

  private value = {};
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      transaction_date: [''],
      terminal_id: [''],
      subsidiary: [''],
      depositor_id: [''],
      amount_realized: [''],
      amount_deposited: [''],
      deposited_date: [''],
      teller: [''],
      record_status: [''],
      acknowledged_date: [''],
      authorized_date: [''],
    });
  }
  onSubmit() {
    const payload = this.addForm.value;
    console.log('Form Input ', payload);
    this.apiService.createBankRegister(payload).subscribe( (response: any) => {
      console.log(response);
      if (response.success) {
        window.localStorage.setItem('bankRegisterDetailId', response.payload.id);
        this.router.navigate(['bank-register/detail']);
      } else {
        console.log(response.message);
      }
        this.router.navigate(['bank-register']);
      });
  }

  goBack() {
    this.router.navigate(['bank-register']);
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
