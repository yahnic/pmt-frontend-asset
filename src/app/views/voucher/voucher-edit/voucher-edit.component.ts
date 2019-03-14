import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../_services';
import { ApiResponse, Voucher, SelectOptionInterface } from '../../../_models';


@Component({
  selector: 'app-voucher-edit',
  templateUrl: './voucher-edit.component.html',
  styleUrls: ['./voucher-edit.component.scss']
})
export class VoucherEditComponent implements OnInit {

  vouchers: Array<Voucher>;
  voucher: Voucher;

  staff: SelectOptionInterface[];
  activestaff: SelectOptionInterface[];

  driver: SelectOptionInterface[];
  activedriver: SelectOptionInterface[];

  account_heading: SelectOptionInterface[];
  activeaccount_heading: SelectOptionInterface[];

  voucher_stage: SelectOptionInterface[];
  activevoucher_stage: SelectOptionInterface[];

  editForm: FormGroup;
  response: ApiResponse;

  private value = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService,
    ) {
  }

  ngOnInit() {
    const voucherId = window.localStorage.getItem('voucherEditId');
    if (!voucherId) {
      alert('Invalid action.');
      this.router.navigate(['voucher']);
      return;

  }
    this.getStaff();
    this.getDriver();
    this.getVoucherStage();
    this.getAccountHeading();

  this.editForm = this.formBuilder.group({
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
  this.voucher = this.utilsService.cleanObject(this.getRecord(voucherId));

    this.editForm.get('transaction_code').setValue(this.voucher.transaction_code || '');
    this.editForm.get('related_voucher_id').setValue(this.voucher.related_voucher_id || '');
    this.editForm.get('voucher_stage_id').setValue(this.voucher.voucher_stage_id);
    this.editForm.get('account_heading_id').setValue(this.voucher.account_heading_id);
    this.editForm.get('description').setValue(this.voucher.description || '');
    this.editForm.get('terminal_id').setValue(this.voucher.terminal_id || '');
    this.editForm.get('subsidiary').setValue(this.voucher.subsidiary || '');
    this.editForm.get('amount').setValue(this.voucher.amount.toString(10));
    this.editForm.get('voucher_type').setValue(this.voucher.voucher_type || '');
    this.editForm.get('processing').setValue(this.voucher.processing || '');
    this.editForm.get('beneficiary').setValue(this.voucher.beneficiary || '');
    this.editForm.get('staff_id').setValue(this.voucher.staff_id);
    this.editForm.get('driver_id').setValue(this.voucher.driver_id);
    this.editForm.get('acknowledge_by').setValue(this.voucher.acknowledge_by || '');
    this.editForm.get('acknowledge_date').setValue(this.voucher.acknowledge_date.toString());
    this.editForm.get('endorsed_date').setValue(this.voucher.endorsed_date.toString());
    this.editForm.get('endorsed_by').setValue(this.voucher.endorsed_by || '');
    this.editForm.get('authorized_date').setValue(this.voucher.authorized_date.toString());
    this.editForm.get('authorized_by').setValue(this.voucher.authorized_by || '');
    this.editForm.get('approved_by').setValue(this.voucher.approved_by || '');
    this.editForm.get('approved_date').setValue(this.voucher.approved_date.toString());
    this.editForm.get('paid_by').setValue(this.voucher.paid_by || '');
    this.editForm.get('paid_date').setValue(this.voucher.paid_date.toString());
    this.editForm.get('pay_channel').setValue(this.voucher.pay_channel || '');
    this.editForm.get('received_by').setValue(this.voucher.received_by || '');
    this.editForm.get('received_date').setValue(this.voucher.received_date.toString());
    this.editForm.get('checked_by').setValue(this.voucher.checked_by || '');
    this.editForm.get('checked_date').setValue(this.voucher.checked_date.toString());
    this.editForm.get('audited_by').setValue(this.voucher.audited_by || '');
    this.editForm.get('audited_date').setValue(this.voucher.audited_date.toString());

    console.log('\nVoucher Name', typeof this.voucher, this.voucher);
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
      const payload = this.editForm.value;
      payload.id = this.voucher.id;
      console.log('editForm payload ', JSON.stringify(payload));
      this.apiService.updateVoucher(payload).pipe(first()).subscribe(data => {
            this.response = data;
            this.voucher = this.response.payload;
            if (this.response.success) {
              alert('User updated successfully.');
              this.router.navigate(['voucher']); // list-voucher
              // Update Local Content
             // window.localStorage.setItem('voucher', JSON.stringify(this.response.payload));
              window.localStorage.setItem('voucher_updated', JSON.stringify(new Date()));
            } else {
              alert(this.response.message);
            }


          },
          error => {
            alert(error);
          });
    }

    getRecord(voucherId) {
      console.log('\nVoucher Id ', voucherId);
      const storedRecords = window.localStorage.getItem('voucher');
      const updated = window.localStorage.getItem('voucher_updated');
      if (storedRecords) {
          this.vouchers = JSON.parse(storedRecords);
          console.log(`Records retrieved since ${updated}`);
      }
      const t = this.apiService.getOneVoucher(this.vouchers, voucherId);
      return t[0];
    }

    voucherAdd(): void {
      this.router.navigate(['voucher/add']);
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
