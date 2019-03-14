import { Component, OnInit } from '@angular/core';
import { VoucherStage, ApiResponse } from '../../_models';
import { ApiService } from '../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voucher-stage',
  templateUrl: './voucher-stage.component.html',
  styleUrls: ['./voucher-stage.component.scss']
})
export class VoucherStageComponent implements OnInit {
  response: any;
  success = false;
  message = '';

  voucherStages: Array<VoucherStage>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
  }
  this.VoucherStageRetrieve();
    const storedRecords = window.localStorage.getItem('voucher_stage');
    const updated = window.localStorage.getItem('voucher_stage_updated');
    if (storedRecords && updated) {
        this.voucherStages = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    } else {
      this.VoucherStageRetrieve();
    }
  }

  VoucherStageRetrieve(): void {
      this.apiService.getVoucherStage().subscribe(data => {
        this.response = data;
        console.log(this.response);
        this.voucherStages = this.response.payload;
        this.success = this.response.success;
        this.message = this.response.message;
        if (this.response.success) {
          window.localStorage.setItem('voucher_stage', JSON.stringify(this.response.payload));
          window.localStorage.setItem('voucher_stage_updated', JSON.stringify(new Date()));
        }
    });
  }
  voucherStageDetail(voucherStage: VoucherStage): void {
    window.localStorage.removeItem('VoucherStageDetailId');
    window.localStorage.setItem('voucherStageDetailId', voucherStage.id);
    this.router.navigate(['voucher-stage/detail'])
      .then(nav => { console.log(nav); }, err => {console.log(err); });
    console.log('Navigating to Voucher Stage detail');
    return;
  }
  voucherStageDelete(voucherStage: VoucherStage): void {
    this.apiService.deleteBankRegister(voucherStage.id).subscribe( data => {
        this.voucherStages = this.voucherStages.filter(i => i.id !== voucherStage.id);
        window.localStorage.setItem('voucher_stage', JSON.stringify(this.voucherStages));
      });
  }
  voucherStageEdit(voucherStage: VoucherStage): void {
    window.localStorage.removeItem('voucherStageEditId');
    window.localStorage.setItem('voucherStageEditId', voucherStage.id);
    this.router.navigate(['voucher-stage/edit']);
  }
  voucherStageAdd(): void {
    this.router.navigate(['voucher-stage/add']);
  }

}
