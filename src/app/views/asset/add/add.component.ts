import { Asset } from './../../../_models/asset';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../_services';
import { ApiResponse, SelectOptionInterface } from '../../../_models';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;

  private value = {};
  staff: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: [''],
      label: [''],
      serial: [''],
      type: [''],
      make: [''],
      measure: [''],
      asset_category_id: [''], // object
      description: [''],
      terminal_id: [''], // object
      subsidiary: [''],
      location: [''],
      is_consumable: [''],
      usability: [''],
      worth: [''],
      staff_id: [''],
      launch_date: [''],  // date
      expire_date: [''], // date
      purchase_id: [''], // object
      opening_value: [''], // number
      closing_value: [''], // number
      current_value: [''], // number
      salvage_value: [''], // number
      photo: [''],
      lifespan: [''], // number
      total_depreciable_cost: [''], // number
      depreciation_rate: [''],  // number
      depreciation_expense: [''],  // number
      accumulated_depreciation: ['']  // number
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

onSubmit() {
  const payload = this.addForm.value;
  console.log('Form input ', payload);
  this.apiService.createAsset(payload).subscribe( data => {
    console.log(data);
    if (data.success) {
      window.localStorage.setItem('assetDetailId', data.payload.id);
      this.router.navigate(['asset/detail']);
    } else {
      console.log(data.message);
    }
      this.router.navigate(['asset']);
    });
}

goBack() {
  this.router.navigate(['asset']);
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



