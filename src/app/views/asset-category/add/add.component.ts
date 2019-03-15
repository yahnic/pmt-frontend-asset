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
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: [''],
      description: [''],
    });
  }

  onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', payload);
    this.apiService.createAssetCategory(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('assetcategoryDetailId', data.payload.id);
        this.router.navigate(['assetcategory/detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['asset-category']);
      });
  }

  goBack() {
    this.router.navigate(['asset-category']);
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
