import { AssetCategory } from './../../../_models/asset-category';
import { Component, OnInit, inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../_services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  assetcategorys: Array<AssetCategory>;
  assetcategory: AssetCategory;

  name = '';
  description = '';

  response: any;
  success = false;
  message = '';

    constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }

    ngOnInit() {
      const assetcategoryId = window.localStorage.getItem('assetcategoryDetailId');
      if (!assetcategoryId) {
        alert('Invalid action! No assetcategoryId ');
        this.router.navigate(['asset-category']); // list-assetcategory
        return;
      }
    this.assetcategory = this.utilsService.cleanObject(this.getRecord(assetcategoryId));

      this.name = this.assetcategory.name || '';
      this.description = this.assetcategory.description.toString() || '';

      console.log('\nAssetCategory Name', typeof this.assetcategory, this.assetcategory);
    }
    getRecord(assetcategoryId) {
      console.log('\nAssetCategory Id ', assetcategoryId);
      const storedRecords = window.localStorage.getItem('asset-category');
      const updated = window.localStorage.getItem('asset-caegory_updated');
      if (storedRecords) {
          this.assetcategorys = JSON.parse(storedRecords);
          this.success = true;
      }
      console.log(assetcategoryId);
      const t = this.apiService.getOneAssetCategory(this.assetcategorys , assetcategoryId);
      return t[0];
    }
    assetcategoryEdit(assetcategory: AssetCategory): void {
      window.localStorage.removeItem('assetcategoryEdit');
      window.localStorage.setItem('assetcategoryEditId', assetcategory.id);
      this.router.navigate(['asset-category/edit']);
    }
    assetcategoryAdd(): void {
      this.router.navigate(['asset-category/add']);
    }
    goBack() {
      this.router.navigate(['asset-category']);
    }
  }
