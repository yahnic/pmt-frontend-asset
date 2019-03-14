import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../_services';
import { VoucherStage, ApiResponse, SelectOptionInterface } from '../../../_models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-voucher-stage-add',
  templateUrl: './voucher-stage-add.component.html',
  styleUrls: ['./voucher-stage-add.component.scss']
})
export class VoucherStageAddComponent implements OnInit {

  addForm: FormGroup;

  private value = {};
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      stage: [''],
      description: [''],
      name: [''],
      officer: [''],
    });
  }
  onSubmit() {
    const payload = this.addForm.value;
    console.log('Form Input ', payload);
    this.apiService.createVoucherStage(payload).subscribe( (response: any) => {
      console.log(response);
      if (response.success) {
        window.localStorage.setItem('voucherStageDetailId', response.payload.id);
        this.router.navigate(['voucher-stage/detail']);
      } else {
        console.log(response.message);
      }
        this.router.navigate(['voucher-stage']);
      });
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
