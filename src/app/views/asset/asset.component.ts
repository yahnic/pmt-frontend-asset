import { Asset } from './../../_models/asset';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services';
import { Router } from '@angular/router';
import { ApiResponse } from '../../_models';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  response: any;
  success = false;
  message = '';
  assets: Array<Asset>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    const storedRecords = window.localStorage.getItem('assets');
    const updated = window.localStorage.getItem('asset_updated');
    if (storedRecords && updated) {
        this.assets = JSON.parse(storedRecords);
        this.success = true;
        this.message = `Records retrieved since ${updated}`;
    } else {
      this.assetRetrieve();
    }
  }

  assetRetrieve(): void {
    this.apiService.retrieveAsset().subscribe(data => {
      this.response = data;
      this.assets = this.response.payload;
      this.success = this.response.success;
      this.message = this.response.message;
      if (this.response.success) {
        window.localStorage.setItem('asset', JSON.stringify(this.response.payload));
        window.localStorage.setItem('asset_updated', JSON.stringify(new Date()));
      }
    });
  }

  assetDetail(asset: Asset): void {
    window.localStorage.removeItem('assetDetailId');
    window.localStorage.setItem('assetDetailId', asset.id);
    this.router.navigate(['asset/detail'])
      .then(nav => { console.log(nav); }, err => {console.log(err); });
    console.log('Navigating to asset detail');
    return;
  }

  assetDelete(asset: Asset): void {
    this.apiService.deleteAsset(asset.id).subscribe( data => {
        this.assets = this.assets.filter(i => i.id !== asset.id);
        window.localStorage.setItem('asset', JSON.stringify(this.assets));
      });
  }

  assetEdit(asset: Asset): void {
    window.localStorage.removeItem('assetEditId');
    window.localStorage.setItem('assetEditId', asset.id);
    this.router.navigate(['asset/edit']);
  }

  assetAdd(): void {
    this.router.navigate(['asset/add']);
  }
}
