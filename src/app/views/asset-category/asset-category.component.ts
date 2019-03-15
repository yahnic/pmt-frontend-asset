import { AssetCategory } from './../../_models/asset-category';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-category',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.scss']
})
export class AssetCategoryComponent implements OnInit {
  response: any;
  success = false;
  message = '';
  assetcategorys: Array<AssetCategory>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    const storedRecords = window.localStorage.getItem('asset-category');
    const updated = window.localStorage.getItem('asset-category_updated');
    if (storedRecords && updated) {
        this.assetcategorys = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    } else {
      this.assetcategoryaRetrieve();
    }
  }

  assetcategoryaRetrieve(): void {
    this.apiService.retrieveAsset().subscribe(data => {
      this.response = data;
      this.assetcategorys = this.response.payload;
      this.success = this.response.success;
      this.message = this.response.message;
      if (this.response.success) {
        window.localStorage.setItem('asset-category', JSON.stringify(this.response.payload));
        window.localStorage.setItem('asset-category_updated', JSON.stringify(new Date()));
      }
    });
  }

  assetcategoryDetail(assetcategory: AssetCategory): void {
    window.localStorage.removeItem('assetcategoryDetailId');
    window.localStorage.setItem('assetcategoryDetailId', assetcategory.id);
    this.router.navigate(['asset-category/detail'])
      .then(nav => { console.log(nav); }, err => {console.log(err); });
    console.log('Navigating to assetcategory detail');
    return;
  }

  assetcategoryDelete(assetcategory: AssetCategory): void {
    this.apiService.deleteAsset(assetcategory.id).subscribe( data => {
        this.assetcategorys = this.assetcategorys.filter(i => i.id !== assetcategory.id);
        window.localStorage.setItem('asset-category', JSON.stringify(this.assetcategorys));
      });
  }

  assetcategoryEdit(assetcategory: AssetCategory): void {
    window.localStorage.removeItem('assetcategoryEditId');
    window.localStorage.setItem('assetcategoryEditId', assetcategory.id);
    this.router.navigate(['asset-category/edit']);
  }

  assetcategoryAdd(): void {
    this.router.navigate(['asset-category/add']);
  }
}
