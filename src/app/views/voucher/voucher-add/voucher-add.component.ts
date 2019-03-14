import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../_services';
import { Voucher, ApiResponse, SelectOptionInterface } from '../../../_models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-voucher-add',
  templateUrl: './voucher-add.component.html',
  styleUrls: ['./voucher-add.component.scss']
})
export class VoucherAddComponent implements OnInit {

  addForm: FormGroup;

  staff: SelectOptionInterface[];
  activestaff: SelectOptionInterface[];

  driver: SelectOptionInterface[];
  activedriver: SelectOptionInterface[];

  account_heading: SelectOptionInterface[];
  activeaccount_heading: SelectOptionInterface[];

  voucher_stage: SelectOptionInterface[];
  activevoucher_stage: SelectOptionInterface[];

  // voucher_stage: Array<{ id: string, name: string }>;
  // account_heading: Array<{ id: string, name: string }>;

  private value = {};

//   cities = [
//     {id: 1, name: 'Vilnius'},
//     {id: 2, name: 'Kaunas'},
//     {id: 3, name: 'Pavilnys', disabled: true},
//     {id: 4, name: 'Pabradė'},
//     {id: 5, name: 'Klaipėda'}
//   ];
//  // selectedCity: any;
//   selectedCityIds: string[];
//   selectedCityName = 'Vilnius';
//   selectedCityId: number;


  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {

    this.getStaff();
    this.getDriver();
    this.getVoucherStage();
    this.getAccountHeading();

    this.addForm = this.formBuilder.group({
        selectedCity: [''],
        transaction_code : [''],
        related_voucher_id : [''],
        voucher_stage_id : [''],
        account_heading_id : [''],
        terminal_id : [''],
        subsidiary : [''],
        amount : [''],
        description : [''],
        voucher_type : [''],
        processing : [''], // "PENDING|COMPLETE|CANCEL" (required)
        beneficiary : [''], // "STAFF|DRIVER" (required)
        staff_id : [''],
        driver_id  : [''],
        acknowledge_by : [''],
        acknowledge_date : [''],
        endorsed_date : [''],
        endorsed_by: [''],
        authorized_date : [''],
        authorized_by : [''],
        approved_by : [''],
        approved_date : [''],
        paid_by : [''],
        paid_date : [''],
        pay_channel : [''], // "CASH|CHEQUE|BANKTRANSFER"
        received_by : [''],
        received_date : [''],
        checked_by : [''],
        checked_date : [''],
        audited_by : [''],
        audited_date : [''],
    });
  }

  getStaff() {
    const storeRecords = window.localStorage.getItem('staff');

    if (storeRecords) {
      this.staff = JSON.parse(storeRecords);
      console.log(this.staff);
      return;
    }
    this.apiService.retrieveStaff().subscribe(data => {
      if (data.success) {
        this.staff = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
        window.localStorage.setItem('staff', JSON.stringify(this.staff));
      } else {
        console.log(data.message);
      }
    });
  }

  getDriver() {
    const storeRecords = window.localStorage.getItem('driver');

    if (storeRecords) {
      this.driver = JSON.parse(storeRecords);
      console.log(this.driver);
      return;
    }
    this.apiService.retrieveDriver().subscribe(data => {
      if (data.success) {
        this.driver = data.payload.map(item => ({id: item.id, text: item.surname + ' ' + item.other_name}));
        window.localStorage.setItem('driver', JSON.stringify(this.driver));
      } else {
        console.log(data.message);
      }
    });
  }

  getVoucherStage() {
    const storeRecords = window.localStorage.getItem('voucher_stage');

    if (storeRecords) {
      this.voucher_stage = JSON.parse(storeRecords);
      console.log(this.voucher_stage);
      return;
    }
    this.apiService.retrieveVoucherStage().subscribe(data => {
      if (data.success) {
        this.voucher_stage = data.payload.map(item => ({id: item.id, text: item.name}));
        window.localStorage.setItem('voucher_stage', JSON.stringify(this.voucher_stage));
      } else {
        console.log(data.message);
      }
    });
  }

  getAccountHeading() {
    const storeRecords = window.localStorage.getItem('account_heading');

    if (storeRecords) {
      this.account_heading = JSON.parse(storeRecords);
      console.log(this.account_heading);
      return;
    }
    this.apiService.retrieveAccountHeading().subscribe(data => {
      if (data.success) {
        this.account_heading = data.payload.map(item => ({id: item.id, text: item.name}));
        window.localStorage.setItem('account_heading', JSON.stringify(this.account_heading));
      } else {
        console.log(data.message);
      }
    });
  }

  onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', JSON.stringify(payload));
    // payload.staff_id = payload.id;
    // payload.voucher_stage_id = payload.id;
    // payload.account_heading_id = payload.id;
    // payload.driver_id = payload.id;
    // delete payload.staff;
    // delete payload.voucher_stage;
    // delete payload.driver;
    // delete payload.account_heading;
    this.apiService.createVoucher(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('voucherDetailId', data.payload.id);
        this.router.navigate(['voucher/detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['voucher']);
      });
  }

  goBack() {
    this.router.navigate(['voucher']);
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
