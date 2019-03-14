import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng2-select';


import { BankRegisterRoutingModule } from './bank-register-routing.module';
import { BankRegisterComponent } from './bank-register.component';
import { BankRegisterEditComponent } from './bank-register-edit/bank-register-edit.component';
import { BankRegisterAddComponent } from './bank-register-add/bank-register-add.component';
import { BankRegisterDetailComponent } from './bank-register-detail/bank-register-detail.component';



@NgModule({
  declarations: [BankRegisterComponent, BankRegisterEditComponent, BankRegisterAddComponent, BankRegisterDetailComponent],
  imports: [
    CommonModule,
    BankRegisterRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule

  ]
})
export class BankRegisterModule { }
