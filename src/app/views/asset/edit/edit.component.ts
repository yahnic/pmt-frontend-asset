import { Asset } from './../../../_models/asset';
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
  assets: Array<Asset>;
  asset: Asset;

  editForm: FormGroup;

  response: ApiResponse;
  private value = {};
  private formData = {
    name: '',
    label: '',
    serial: '',
    type: '',
    make: '',
    measure: '',
    asset_category_id: '', // object;
    description: '',
    terminal_id: '',  // object;
    subsidiary: '',
    location: '',
    is_consumable: '',
    usability: '',
    worth: '',
    staff_id: '',  // object;
    launch_date: '', //  Date;
    expire_date: '',  // Date;
    purchase_id: '',  // object;
    opening_value: '', // number;
    closing_value: '', //  number;
    current_value: '', // number;
    salvage_value: '', // number;
    photo: '',
    lifespan: '', // number;
    total_depreciable_cost: '', //  number;
    depreciation_rate: '',  // number;
    depreciation_expense: '',  // number;
    accumulated_depreciation: ''  //  number;
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

    ngOnInit() {
      const assetId = window.localStorage.getItem('assetEditId');
      if (!assetId) {
        alert('Invalid action.');
        this.router.navigate(['asset']); // list-asset
        return;
     }
     this.editForm = this.formBuilder.group({
      name: [''],
      label: [''],
      serial: [''],
      type: [''],
      make: [''],
      measure: [''],
      asset_category_id: [''],
      description: [''],
      terminal_id: [''],
      subsidiary: [''],
      location: [''],
      is_consumable: [''],
      usability: [''],
      worth: [''],
      staff_id: [''],
      launch_date: [''],
      expire_date: [''],
      purchase_id: [''],
      opening_value: [''],
      closing_value: [''],
      current_value: [''],
      salvage_value: [''],
      photo: [''],
      lifespan: [''],
      total_depreciable_cost: [''],
      depreciation_rate: [''],
      depreciation_expense: [''],
      accumulated_depreciation: ['']
    });

    this.asset = this.utilsService.cleanObject(this.getRecord(assetId));
     // not yet
    this.editForm.get('name').setValue(this.asset.name || '');
    this.editForm.get('label').setValue(this.asset.label || '');
    this.editForm.get('serial').setValue(this.asset.serial || '');
    this.editForm.get('type').setValue(this.asset.type || '');
    this.editForm.get('make').setValue(this.asset.make || '');
    this.editForm.get('measure').setValue(this.asset.measure || '');
    this.editForm.get('asset_category_id').setValue(this.asset.asset_category_id || '');
    this.editForm.get('description').setValue(this.asset.description || '');
    this.editForm.get('terminal_id').setValue(this.asset.terminal_id || '');
    this.editForm.get('subsidiary').setValue(this.asset.subsidiary || '');
    this.editForm.get('location').setValue(this.asset.location || '');
    this.editForm.get('is_consumable').setValue(this.asset.is_consumable || '');
    this.editForm.get('usability').setValue(this.asset.usability || '');
    this.editForm.get('worth').setValue(this.asset.worth || '');
    this.editForm.get('staff_id').setValue(this.asset.staff_id || '');
    this.editForm.get('launch_date').setValue(this.asset.launch_date || '');
    this.editForm.get('expire_date').setValue(this.asset.expire_date || '');
    this.editForm.get('purchase_id').setValue(this.asset.purchase_id || '');
    this.editForm.get('opening_value').setValue(this.asset.opening_value || '');
    this.editForm.get('closing_value').setValue(this.asset.closing_value || '');
    this.editForm.get('current_value').setValue(this.asset.current_value || '');
    this.editForm.get('salvage_value').setValue(this.asset.salvage_value || '');
    this.editForm.get('photo').setValue(this.asset.photo || '');
    this.editForm.get('lifespan').setValue(this.asset.lifespan || '');
    this.editForm.get('total_depreciable_cost').setValue(this.asset.total_depreciable_cost || '');
    this.editForm.get('depreciation_rate').setValue(this.asset.depreciation_rate || '');
    this.editForm.get('depreciation_expense').setValue(this.asset.depreciation_expense || '');
    this.editForm.get('accumulated_depreciation').setValue(this.asset.accumulated_depreciation || '');
    console.log('\nAsset Name', typeof this.asset, this.asset);
  }
    onSubmit() {
      const payload = this.editForm.value;
      payload.id = this.asset.id;
      console.log('editForm payload ', payload);
      this.apiService.updateAsset(payload).pipe(first()).subscribe(data => {
            this.response = data;
            this.asset = this.response.payload;
            if (this.response.success) {
              alert('User updated successfully.');
              this.router.navigate(['asset']); // list-asset
              window.localStorage.setItem('asset_updated', JSON.stringify(new Date()));
            } else {
              alert(this.response.message);
            }


          },
          error => {
            alert(error);
          });
    }

    getRecord(assetId) {
      console.log('\nAsset Id ', assetId);
      const storedRecords = window.localStorage.getItem('asset');
      const updated = window.localStorage.getItem('asset_updated');
      if (storedRecords) {
          this.assets = JSON.parse(storedRecords);
          console.log(`Records retrieved since ${updated}`);
      }
      const t = this.apiService.getAsset(this.assets, assetId);
      return t[0];
    }

    assetAdd(): void {
      this.router.navigate(['asset/add']);
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
