import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../_services';
import { VoucherStage } from '../../../_models';

@Component({
  selector: 'app-voucher-stage-detail',
  templateUrl: './voucher-stage-detail.component.html',
  styleUrls: ['./voucher-stage-detail.component.scss']
})
export class VoucherStageDetailComponent implements OnInit {

  voucherStages: Array<VoucherStage>;
  voucherStage: VoucherStage;

  id = '';
  stage = '';
  name = '';
  officer = '';
  description = '';

  response: any;
  success = false;
  message = '';

  constructor(private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }

  ngOnInit() {
    const voucherStageId = window.localStorage.getItem('voucherStageDetailId');
    if (!voucherStageId) {
      alert('Invalid action.');
      this.router.navigate(['voucher-stage']);
      return;
  }
  this.voucherStage = this.utilsService.cleanObject(this.getRecord(voucherStageId));

    this.id = this.voucherStage.id || '';
    this.stage = this.voucherStage.stage || '';
    this.name  = this.voucherStage.name || '';
    this.officer = this.voucherStage.officer || '';
    this.description = this.voucherStage.description || '';
    console.log('\nVoucher Stage ', typeof this.voucherStage, this.voucherStage);
  }
  getRecord(voucherStageId) {
    console.log('\nVoucher Stage Id ', voucherStageId);
    const storedRecords = window.localStorage.getItem('voucher_stage');
    const updated = window.localStorage.getItem('voucher_stage_updated');
    if (storedRecords) {
        this.voucherStages = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    }
    const t = this.apiService.getTerminal(this.voucherStages, voucherStageId);
    return t[0];
  }

  voucherStageEdit(voucherStage: VoucherStage): void {
    window.localStorage.removeItem('voucherStageEditId');
    window.localStorage.setItem('voucherStageEditId', voucherStage.id);
    this.router.navigate(['voucher-stage/edit']);
  }

  voucherStageAdd(): void {
    this.router.navigate(['voucher-stage/add']);
  }

  goBack() {
    this.router.navigate(['voucher-stage']);
  }

}
