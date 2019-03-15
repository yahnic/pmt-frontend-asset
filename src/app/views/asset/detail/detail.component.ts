import { Asset } from './../../../_models/asset';
import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../_services';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
  export class DetailComponent implements OnInit {
    assets: Array<Asset>;
    asset: Asset;

    label = '';
    serial = '';
    name = '';
    type = '';
    make = '';
    measure: '';
    asset_category_id = ''; // object;
    description = '';
    terminal_id = ''; // object;
    subsidiary = '';
    location = '';
    is_consumable = '';
    usability = '';
    worth = '';
    staff_id =  ''; // object;
    launch_date = ''; // Date;
    expire_date = ''; // Date;
    purchase_id = ''; // object;
    opening_value = ''; // number;
    closing_value  = ''; // number;
    current_value = ''; // number;
    salvage_value = ''; // number;
    photo = '';
    lifespan = ''; // number;
    total_depreciable_cost = ''; // number;
    depreciation_rate = ''; // number;
    depreciation_expense = ''; // number;
    accumulated_depreciation = ''; // number;

    response: any;
    success = false;
    message = '';

      constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }

      ngOnInit() {
        const assetId = window.localStorage.getItem('assetDetailId');
        if (!assetId) {
          alert('Invalid action! No assetId ');
          this.router.navigate(['asset']); // list-asset
          return;
        }
      this.asset = this.utilsService.cleanObject(this.getRecord(assetId));

    this.label = this.asset.label || '';
    this.serial = this.asset.serial || '';
    this.name = this.asset.name || '';
    this.type = this.asset.type || '';
    this.make = this.asset.make || '';
    // this.measure = this.asset.measure || '';
    // if (this.utilsService.hasProp(this.asset, 'measure')) {
    // this.measure = this.asset.measure.toString();
    //  }
    this.location = this.asset.location || '';
    this.subsidiary = this.asset.subsidiary || '';
    this.is_consumable = this.asset.is_consumable || '';
    this.usability = this.asset.usability || '';
    this.worth = this.asset.worth || '';

    this.staff_id = this.asset.staff_id.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'staff_id')) {
      this.staff_id = this.asset.staff_id.toString();
    }
    this.launch_date = this.asset.launch_date.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'launch_date')) {
      this.launch_date = this.asset.launch_date.toString();
    }
    this.expire_date = this.asset.expire_date.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'expire_date')) {
      this.expire_date = this.asset.expire_date.toString();
    }
    this.opening_value = this.asset.opening_value.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'opening_value')) {
      this.opening_value = this.asset.opening_value.toString();
    }
    this.closing_value = this.asset.closing_value.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'closing_value')) {
      this.closing_value = this.asset.closing_value.toString();
    }
    this.current_value = this.asset.current_value.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'current_value')) {
      this.current_value = this.asset.current_value.toString();
    }
    this.salvage_value = this.asset.salvage_value.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'salvage_value')) {
      this.salvage_value = this.asset.salvage_value.toString();
    }
    this.photo = this.asset.photo || '';
    this.lifespan = this.asset.lifespan.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'lifespan')) {
      this.lifespan = this.asset.lifespan.toString();
    }
    this.total_depreciable_cost = this.asset.total_depreciable_cost.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'total_depreciable_cost')) {
      this.total_depreciable_cost = this.asset.total_depreciable_cost.toString();
    }
    this.depreciation_rate = this.asset.depreciation_rate.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'depreciation_rate')) {
      this.depreciation_rate = this.asset.depreciation_rate.toString();
    }
    this.depreciation_expense = this.asset.depreciation_expense.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'depreciation_expense')) {
      this.depreciation_expense = this.asset.depreciation_expense.toString();
    }
    this.accumulated_depreciation = this.asset.accumulated_depreciation.toString() || '';
    if (this.utilsService.hasProp(this.asset, 'accumulated_depreciation')) {
      this.accumulated_depreciation = this.asset.accumulated_depreciation.toString();
    }
        console.log('\nAsset Name', typeof this.asset, this.asset);
      }
      getRecord(assetId) {
        console.log('\nAsset Id ', assetId);
        const storedRecords = window.localStorage.getItem('asset');
        if (storedRecords) {
            this.assets = JSON.parse(storedRecords);
            this.success = true;
         //   console.log ()
        }
        console.log(assetId);
        const t = this.apiService.getAsset(this.assets , assetId);
        return t[0];
      }
      assetEdit(asset: Asset): void {
        window.localStorage.removeItem('assetEditId');
        window.localStorage.setItem('assetEditId', asset.id);
        this.router.navigate(['asset/edit']);
      }
      assetAdd(): void {
        this.router.navigate(['asset/add']);
      }
      goBack() {
        this.router.navigate(['asset']);
      }
    }
