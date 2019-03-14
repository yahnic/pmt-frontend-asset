import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services';
import { Router } from '@angular/router';
import { BankRegister, ApiResponse } from '../../_models';

@Component({
  selector: 'app-bank-register',
  templateUrl: './bank-register.component.html',
  styleUrls: ['./bank-register.component.scss']
})
export class BankRegisterComponent implements OnInit {

  response: any;
  success = false;
  message = '';

  bankRegisters: Array<BankRegister>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
  }
  this.BankRegisterRetrieve();
    const storedRecords = window.localStorage.getItem('bank_register');
    const updated = window.localStorage.getItem('bank_register_updated');
    if (storedRecords && updated) {
        this.bankRegisters = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    } else {
      this.BankRegisterRetrieve();
    }
  }

    BankRegisterRetrieve(): void {
      this.apiService.getBankRegister().subscribe(data => {
        this.response = data;
        console.log(this.response);
        this.bankRegisters = this.response.payload;
        this.success = this.response.success;
        this.message = this.response.message;
        if (this.response.success) {
          window.localStorage.setItem('bank_register', JSON.stringify(this.response.payload));
          window.localStorage.setItem('bank_register_updated', JSON.stringify(new Date()));
        }
    });
  }
  bankRegisterDetail(bankRegister: BankRegister): void {
    window.localStorage.removeItem('BankRegisterDetailId');
    window.localStorage.setItem('bankRegisterDetailId', bankRegister.id);
    this.router.navigate(['bank-register/detail'])
      .then(nav => { console.log(nav); }, err => {console.log(err); });
    console.log('Navigating to bank Register detail');
    return;
  }
  bankRegisterDelete(bankRegister: BankRegister): void {
    // const result = confirm('Are you sure you want to Delete this Record');
    // if (result) {
    //   console.log(bankRegister.id);
    //   event.preventDefault();
    this.apiService.deleteBankRegister(bankRegister.id).subscribe( data => {
        this.bankRegisters = this.bankRegisters.filter(i => i.id !== bankRegister.id);
        window.localStorage.setItem('bank_register', JSON.stringify(this.bankRegisters));
      });
}

  bankRegisterEdit(bankRegister: BankRegister): void {
    window.localStorage.removeItem('bankRegisterEditId');
    window.localStorage.setItem('bankRegisterEditId', bankRegister.id);
    this.router.navigate(['bank-register/edit']);
  }

  bankRegisterAdd(): void {
    this.router.navigate(['bank-register/add']);
  }

}
