import { Component, OnInit } from '@angular/core';
import { Voucher, ApiResponse } from '../../_models';
import { ApiService } from '../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

  response: any;
  success = false;
  message = '';

  vouchers: Array<Voucher>;
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.VoucherRetrieve();
    const storedRecords = window.localStorage.getItem('voucher');
    const updated = window.localStorage.getItem('voucher_updated');
    if (storedRecords && updated) {
        this.vouchers = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    } else {
      this.VoucherRetrieve();
    }
  }
  VoucherRetrieve(): void {
    this.apiService.getVoucher().subscribe(data => {
      this.response = data;
      console.log(this.response);
      this.vouchers = this.response.payload;
      this.success = this.response.success;
      this.message = this.response.message;
      if (this.response.success) {
        window.localStorage.setItem('voucher', JSON.stringify(this.response.payload));
        window.localStorage.setItem('voucher_updated', JSON.stringify(new Date()));
      }
  });
}
voucherDetail(voucher: Voucher): void {
  window.localStorage.removeItem('voucherDetailId');
  window.localStorage.setItem('voucherDetailId', voucher.id);
  this.router.navigate(['voucher/detail'])
    .then(nav => { console.log(nav); }, err => {console.log(err); });
  console.log('Navigating to Voucher detail');
  return;
}
voucherDelete(voucher: Voucher): void {
  this.apiService.deleteBankRegister(voucher.id).subscribe( data => {
      this.vouchers = this.vouchers.filter(i => i.id !== voucher.id);
      window.localStorage.setItem('voucher', JSON.stringify(this.vouchers));
    });
}
voucherEdit(voucher: Voucher): void {
  window.localStorage.removeItem('voucherEditId');
  window.localStorage.setItem('voucherEditId', voucher.id);
  this.router.navigate(['voucher/edit']);
}
voucherAdd(): void {
  this.router.navigate(['voucher/add']);
}

}
