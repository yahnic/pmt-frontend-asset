import { AssetCategory } from './../../../_models/asset-category';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../_services';
import { ApiResponse, SelectOptionInterface } from '../../../_models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  assetcategorys: Array<AssetCategory>;
  assetcategory: AssetCategory;

  editForm: FormGroup;

  response: ApiResponse;
  private value = {};
  private formData = {
    name: '',
    description: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

    ngOnInit() {
      const assetcategoryId = window.localStorage.getItem('assetcategoryEditId');
      if (!assetcategoryId) {
        alert('Invalid action.');
        this.router.navigate(['assetcategory']); // list-assetcategory
        return;
     }
     this.editForm = this.formBuilder.group({
      name: [''],
      description: [''],
    });

    this.assetcategory = this.utilsService.cleanObject(this.getRecord(assetcategoryId));

    this.editForm.get('name').setValue(this.assetcategory.name || '');
    this.editForm.get('description').setValue(this.assetcategory.description || '');

    console.log('\nAssetCategory Name', typeof this.assetcategory, this.assetcategory);
  }
    onSubmit() {
      const payload = this.editForm.value;
      payload.id = this.assetcategory.id;
      console.log('editForm payload ', payload);
      this.apiService.updateAssetCategory(payload).pipe(first()).subscribe(data => {
            this.response = data;
            this.assetcategory = this.response.payload;
            if (this.response.success) {
              alert('User updated successfully.');
              this.router.navigate(['assetcategory']); // list-assetcategory
              window.localStorage.setItem('assetcategory_updated', JSON.stringify(new Date()));
            } else {
              alert(this.response.message);
            }


          },
          error => {
            alert(error);
          });
    }

    getRecord(assetcategoryId) {
      console.log('\nAssetCategory Id ', assetcategoryId);
      const storedRecords = window.localStorage.getItem('asset-category');
      console.log(storedRecords);
      const updated = window.localStorage.getItem('assetcategory_updated');
      if (storedRecords) {
          this.assetcategorys = JSON.parse(storedRecords);
          console.log(`Records retrieved since ${updated}`);
      }
      const t = this.apiService.getOneAssetCategory(this.assetcategorys, assetcategoryId);
      return t[0];
    }

    assetcategorytAdd(): void {
      this.router.navigate(['asset-category/edit']);
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
