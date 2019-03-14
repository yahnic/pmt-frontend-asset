import { Component, OnInit } from '@angular/core';
import { BankRegister } from '../../../_models';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../_services';


@Component({
  selector: 'app-bank-register-detail',
  templateUrl: './bank-register-detail.component.html',
  styleUrls: ['./bank-register-detail.component.scss']
})
export class BankRegisterDetailComponent implements OnInit {

  bankRegisters: Array<BankRegister>;
  bankRegister: BankRegister;

  id = '';
  transaction_date = '';
  terminal_id = '';
  subsidiary = '';
  depositor_id = '';
  amount_realized = '';
  amount_deposited = '';
  deposited_date = '';
  teller = '';
  record_status = '';
  acknowledged_date = '';
  authorized_date = '';

  response: any;
  success = false;
  message = '';
  constructor(private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }

  ngOnInit() {
    const bankRegisterId = window.localStorage.getItem('bankRegisterDetailId');
    if (!bankRegisterId) {
      alert('Invalid action.');
      this.router.navigate(['bank-register']); // list bank register
      return;
    }
    this.bankRegister = this.utilsService.cleanObject(this.getRecord(bankRegisterId));

    this.id = this.bankRegister.id || '';
    this.transaction_date = this.bankRegister.transaction_date.toString();
    this.terminal_id  = this.bankRegister.terminal_id || '';
    this.subsidiary = this.bankRegister.subsidiary || '';
    this.deposited_date = this.bankRegister.deposited_date.toString();
    this.depositor_id = this.bankRegister.depositor_id || '';
    this.amount_deposited = this.bankRegister.amount_deposited.toString(10);
    this.amount_realized = this.bankRegister.amount_realized.toString(10);
    this.teller = this.bankRegister.teller || '';
    this.record_status = this.bankRegister.record_status || '';
    this.acknowledged_date = this.bankRegister.acknowledged_date.toString();
    this.authorized_date = this.bankRegister.authorized_date.toString();

    console.log('\nBank Registers ', typeof this.bankRegister, this.bankRegister);
  }
  getRecord(bankRegisterId) {
    console.log('\nBank Register Id ', bankRegisterId);
    const storedRecords = window.localStorage.getItem('bank_register');
    const updated = window.localStorage.getItem('bank_register_updated');
    if (storedRecords) {
        this.bankRegisters = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getTerminal(this.bankRegisters, bankRegisterId);
    return t[0];
  }

  offenceEdit(bankRegister: BankRegister): void {
    window.localStorage.removeItem('bankRegisterEditId');
    window.localStorage.setItem('bankRegisterEditId', bankRegister.id);
    this.router.navigate(['bank-register/edit']);
  }

  offenceAdd(): void {
    this.router.navigate(['bank-register/add']);
  }

  goBack() {
    this.router.navigate(['bank-register']);
  }

}
