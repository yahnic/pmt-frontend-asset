import { Component, OnInit } from '@angular/core';
import { BankRegister, ApiResponse } from '../../../_models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../_services';



@Component({
  selector: 'app-bank-register-edit',
  templateUrl: './bank-register-edit.component.html',
  styleUrls: ['./bank-register-edit.component.scss']
})
export class BankRegisterEditComponent implements OnInit {

  bankRegisters: Array<BankRegister>;
  bankRegister: BankRegister;

  editForm: FormGroup;
  response: ApiResponse;

  private value = {};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    const bankRegisterId = window.localStorage.getItem('bankRegisterEditId');
    if (!bankRegisterId) {
      alert('Invalid action.');
      this.router.navigate(['bank-register']);
      return;
  }
  this.editForm = this.formBuilder.group({
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
  this.bankRegister = this.utilsService.cleanObject(this.getRecord(bankRegisterId));

    this.editForm.get('transaction_date').setValue(this.bankRegister.transaction_date.toString());
    this.editForm.get('terminal_id').setValue(this.bankRegister.terminal_id || '');
    this.editForm.get('subsidiary').setValue(this.bankRegister.subsidiary || '');
    this.editForm.get('deposited_date').setValue(this.bankRegister.deposited_date.toString());
    this.editForm.get('depositor_id').setValue(this.bankRegister.depositor_id || '');
    this.editForm.get('amount_deposited').setValue(this.bankRegister.amount_deposited.toString(10));
    this.editForm.get('amount_realized').setValue(this.bankRegister.amount_realized.toString(10));
    this.editForm.get('teller').setValue(this.bankRegister.teller || '');
    this.editForm.get('record_status').setValue(this.bankRegister.record_status || '');
    this.editForm.get('acknowledged_date').setValue(this.bankRegister.acknowledged_date.toString());
    this.editForm.get('authorized_date').setValue(this.bankRegister.authorized_date.toString());

    console.log('\nBank Register ', typeof this.bankRegister, this.bankRegister);
  }
  onSubmit() {
    const payload = this.editForm.value;
    payload.id = this.bankRegister.id;
    console.log('editForm payload ', payload);
    this.apiService.updateBankRegister(payload).pipe(first()).subscribe(data => {
          this.response = data;
          this.bankRegister = this.response.payload;
          if (this.response.success) {
            alert('User updated successfully.');
            this.router.navigate(['bank-register']);
            // Update Local Content
            window.localStorage.setItem('bank_register', JSON.stringify(this.response.payload));
            window.localStorage.setItem('bank_register_updated', JSON.stringify(new Date()));
          } else {
            alert(this.response.message);
          }


        },
        error => {
          alert(error);
        });
  }

  getRecord(bankRegisterId) {
    console.log('\nBank Register Id ', bankRegisterId);
    const storedRecords = window.localStorage.getItem('bank_register');
    const updated = window.localStorage.getItem('bank_register_updated');
    if (storedRecords) {
        this.bankRegisters = JSON.parse(storedRecords);
        console.log(`Records retrieved since ${updated}`);
    }
    const t = this.apiService.getOneBankRegister(this.bankRegisters, bankRegisterId);
    return t[0];
  }

  bankRegisterAdd(): void {
    this.router.navigate(['bank-register/add']);
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
