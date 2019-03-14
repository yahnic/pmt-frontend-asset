import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankRegisterComponent } from './bank-register.component';
import { BankRegisterEditComponent } from './bank-register-edit/bank-register-edit.component';
import { BankRegisterAddComponent } from './bank-register-add/bank-register-add.component';
import { BankRegisterDetailComponent } from './bank-register-detail/bank-register-detail.component';

const routes: Routes = [
  {path: '', component: BankRegisterComponent, data: {title: 'Bank Register'}},
  {path: 'edit', component: BankRegisterEditComponent, data: {title: 'Edit Bank Register'}},
  {path: 'add', component: BankRegisterAddComponent, data: { title: 'Add Bank Register' }},
  {path: 'detail', component: BankRegisterDetailComponent, data: { title: 'Bank Register Details' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRegisterRoutingModule { }
