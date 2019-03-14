import { Component, OnInit } from '@angular/core';
import { VoucherStage, ApiResponse } from '../../../_models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../_services';



@Component({
  selector: 'app-voucher-stage-edit',
  templateUrl: './voucher-stage-edit.component.html',
  styleUrls: ['./voucher-stage-edit.component.scss']
})
export class VoucherStageEditComponent implements OnInit {

  voucherStages: Array<VoucherStage>;
  voucherStage: VoucherStage;

  editForm: FormGroup;
  response: ApiResponse;

  private value = {};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    const voucherStageId = window.localStorage.getItem('voucherStageEditId');
    if (!voucherStageId) {
      alert('Invalid action.');
      this.router.navigate(['voucher-stage']);
      return;
  }
  this.editForm = this.formBuilder.group({
      stage: [''],
      name: [''],
      officer: [''],
      description: [''],
  });

  this.voucherStage = this.utilsService.cleanObject(this.getRecord(voucherStageId));

    this.editForm.get('stage').setValue(this.voucherStage.stage || '') ;
    this.editForm.get('name').setValue(this.voucherStage.name || '');
    this.editForm.get('officer').setValue(this.voucherStage.officer || '');
    this.editForm.get('description').setValue(this.voucherStage.description || '') ;

    console.log('\nVoucher Stage ', typeof this.voucherStage, this.voucherStage);
  }
  onSubmit() {
    const payload = this.editForm.value;
    payload.id = this.voucherStage.id;
    console.log('editForm payload ', payload);
    this.apiService.updateVoucherStage(payload).pipe(first()).subscribe(data => {
          this.response = data;
          this.voucherStage = this.response.payload;
          if (this.response.success) {
            alert('User updated successfully.');
            this.router.navigate(['voucher-stage']);
            // Update Local Content
            window.localStorage.setItem('voucher-stage', JSON.stringify(this.response.payload));
            window.localStorage.setItem('voucher-stage_updated', JSON.stringify(new Date()));
          } else {
            alert(this.response.message);
          }


        },
        error => {
          alert(error);
        });
  }

  getRecord(voucherStageId) {
    console.log('\nVoucher Stage Id ', voucherStageId);
    const storedRecords = window.localStorage.getItem('voucher_stage');
    const updated = window.localStorage.getItem('voucher_stage_updated');
    if (storedRecords) {
        this.voucherStages = JSON.parse(storedRecords);
        console.log(`Records retrieved since ${updated}`);
    }
    const t = this.apiService.getOneVoucherStage(this.voucherStages, voucherStageId);
    return t[0];
  }

  voucherStageAdd(): void {
    this.router.navigate(['voucher-stage/add']);
  }

  goBack() {
    this.router.navigate(['voucher-stage']);
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
