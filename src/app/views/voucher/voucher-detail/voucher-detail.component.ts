import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../_services';
import { Voucher } from '../../../_models';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent implements OnInit {

  vouchers: Array<Voucher>;
  voucher: Voucher;

  id = '';
  transaction_code = '';
  related_voucher_id = '';
    voucher_stage_id = '';
    account_heading_id = '';
    terminal_id = '';
    subsidiary = '';
    amount = '';
    description = '';
    voucher_type = '';
    processing = ''; // "PENDING|COMPLETE|CANCEL" (required)
    beneficiary = ''; // "STAFF|DRIVER" (required)
    staff_id = '';
    driver_id  = '';
    acknowledge_by = '';
    acknowledge_date = '';
    endorsed_date = '';
    endorsed_by: Object;
    authorized_date = '';
    authorized_by = '';
    approved_by = '';
    approved_date = '';
    paid_by = '';
    paid_date = '';
    pay_channel = ''; // "CASH|CHEQUE|BANKTRANSFER"
    received_by = '';
    received_date = '';
    checked_by = '';
    checked_date = '';
    audited_by = '';
    audited_date = '';

  response: any;
  success = false;
  message = '';

  constructor(private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }

  ngOnInit() {
    const voucherId = window.localStorage.getItem('voucherDetailId');
    if (!voucherId) {
      alert('Invalid action.');
      this.router.navigate(['voucher']); // list-voucher
      return;
    }
    this.voucher = this.utilsService.cleanObject(this.getRecord(voucherId));

    this.id = this.voucher.id || '';
    this.transaction_code = this.voucher.transaction_code || '';
    this.related_voucher_id = this.voucher.related_voucher_id.toString();
    this.voucher_stage_id = this.voucher.voucher_stage_id.toString();
    this.account_heading_id = this.voucher.account_heading_id.toString();
    this.terminal_id = this.voucher.terminal_id.toString();
    this.subsidiary = this.voucher.subsidiary || '';
    this.amount = this.voucher.amount.toString();
    this.description = this.voucher.description || '';
    this.voucher_type = this.voucher.voucher_type || '';
    this.processing = this.voucher.processing || '';
    this.beneficiary = this.voucher.beneficiary || '';
    this.staff_id = this.voucher.staff_id.toString();
    this.driver_id = this.voucher.driver_id.toString();
    this.acknowledge_by = this.voucher.acknowledge_by.toString();
    this.acknowledge_date = this.voucher.acknowledge_date.toString();
    this.endorsed_date = this.voucher.endorsed_date.toString();
    this.endorsed_by = this.voucher.endorsed_by || '';
    this.authorized_date = this.voucher.authorized_date.toString();
    this.authorized_by = this.voucher.authorized_by.toString();
    this.approved_by = this.voucher.approved_by.toString();
    this.approved_date = this.voucher.approved_date.toString();
    this.paid_by = this.voucher.paid_by.toString();
    this.paid_date = this.voucher.paid_date.toString();
    this.pay_channel = this.voucher.pay_channel || '';
    this.received_by = this.voucher.received_by || '';
    this.checked_by = this.voucher.checked_by.toString();
    this.checked_date = this.voucher.checked_date.toString();
    this.audited_by = this.voucher.audited_by.toString();
    this.audited_date = this.voucher.audited_date.toString();


    console.log('\nvoucher Name', typeof this.voucher, this.voucher);
  }
  getRecord(voucherId) {
    console.log('\nvoucher Id ', voucherId);
    const storedRecords = window.localStorage.getItem('voucher');
    const updated = window.localStorage.getItem('voucher_updated');
    if (storedRecords) {
        this.vouchers = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getTerminal(this.vouchers, voucherId);
    return t[0];
  }

  voucherEdit(voucher: Voucher): void {
    window.localStorage.removeItem('voucherEditId');
    window.localStorage.setItem('voucherEditId', voucher.id);
    this.router.navigate(['voucher/edit']);
  }

  voucherAdd(): void {
    this.router.navigate(['voucher/add']);
  }

  goBack() {
    this.router.navigate(['voucher']);
  }

}
