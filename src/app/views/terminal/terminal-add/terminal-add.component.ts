import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../_services';
import { Terminal, ApiResponse, SelectOptionInterface } from '../../../_models';


@Component({
  selector: 'app-terminal-add',
  templateUrl: './terminal-add.component.html',
  styleUrls: ['./terminal-add.component.scss']
})
export class TerminalAddComponent implements OnInit {

  addForm: FormGroup;

  cities: SelectOptionInterface[];
  activeCity: SelectOptionInterface[];

  counties: SelectOptionInterface[];
  activeCounty: SelectOptionInterface[];

  private value = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: [''],
      manager: [''],
      phone: [''],
      quarter: [''],
      city: [''], // object;
      county: [''], // object;
      address: [''],
      longitude: [''], // number;
      latitude: [''], // number;
      capacity: [''], // number;
      is_pml_operational: [''], // boolean;
      is_pmt_operational: [''], // boolean;
      is_pmt_online: [''], // boolean;
      photo: [''],
      flw_subaccount_id: [''], // object;
    });

    this.getCities();
    this.getCounties();
  }


  getCities() {
    const storedRecords = window.localStorage.getItem('city');
    const updated = window.localStorage.getItem('city_updated');
    if (storedRecords) {
        this.cities = JSON.parse(storedRecords);
        console.log(`Records of cities retrieved since ${updated}`);
        return;
    }
    this.apiService.retrieveCity('?fields=id,name').subscribe( data => {
      if (data.success) {
        this.cities = data.payload.map(item => ({ id: item.id, text: item.name }));
        window.localStorage.setItem('city', JSON.stringify(this.counties));
        window.localStorage.setItem('city_updated', JSON.stringify(new Date()));
      } else {
        // this.cities = [ { id: '1a', text: 'Nsukka' }];
        console.log(data.message);
      }
    });
  }

  getCounties() {
    const storedRecords = window.localStorage.getItem('county');
    const updated = window.localStorage.getItem('county_updated');
    if (storedRecords) {
        this.counties = JSON.parse(storedRecords);
        console.log(`Records of counties retrieved since ${updated}`);
        return;
    }
    this.apiService.retrieveCounty('?fields=id,name').subscribe( data => {
      if (data.success) {
        this.counties = data.payload.map(item => ({ id: item.id, text: item.name }));
        window.localStorage.setItem('county', JSON.stringify(this.counties));
        window.localStorage.setItem('county_updated', JSON.stringify(new Date()));
      } else {
        // this.counties = [{ id: 'fa', text: 'Anambra' }];
      console.log(data.message);
      }
    });
  }


  onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', payload);
    payload.city_id = payload.city.id;
    payload.county_id = payload.county.id;
    delete payload.city;
    delete payload.county;
    this.apiService.createTerminal(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('terminalDetailId', data.payload.id);
        this.router.navigate(['terminal/detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['terminal']);
      });
  }

  goBack() {
    this.router.navigate(['term+inal']);
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
