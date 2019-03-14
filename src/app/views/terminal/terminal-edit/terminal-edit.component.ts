import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../_services';
import { ApiResponse, Terminal, SelectOptionInterface } from '../../../_models';

@Component({
  selector: 'app-terminal-edit',
  templateUrl: './terminal-edit.component.html',
  styleUrls: ['./terminal-edit.component.scss']
})
export class TerminalEditComponent implements OnInit {

  terminals: Array<Terminal>;
  terminal: Terminal;

  editForm: FormGroup;
  response: ApiResponse;

  cities: SelectOptionInterface[];
  activeCity: SelectOptionInterface[];

  counties: SelectOptionInterface[];
  activeCounty: SelectOptionInterface[];

  private value = {};

  private formData = {
    name: '',
    manager: '',
    phone: '',
    quarter: '',
    // city: '',
    // county: '',
    address: '',
    longitude: '',
    latitude: '',
    capacity: '',
    is_pml_operational: '',
    is_pmt_operational: '',
    is_pmt_online: '',
    photo: '',
    flw_subaccount_id: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    const terminalId = window.localStorage.getItem('terminalEditId');
    if (!terminalId) {
      alert('Invalid action.');
      this.router.navigate(['terminal']); // list-terminal
      return;
    }

    this.getCities();
    this.getCounties();

    this.editForm = this.formBuilder.group({
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
    // this.editForm.setValue(this.formData);
    this.terminal = this.utilsService.cleanObject(this.getRecord(terminalId));

    this.formData.name = this.terminal.name || '';
    this.formData.manager = this.terminal.manager || 'Manager';
    this.formData.phone = this.terminal.phone || '';
    this.formData.quarter = this.terminal.quarter || '';
    if (this.utilsService.hasProp(this.terminal, 'city_id')) {
      this.activeCity = [{ id: this.terminal.city_id.id, text: this.terminal.city_id.name }];
      // this.formData.city = this.activeCity;
    }
    if (this.utilsService.hasProp(this.terminal, 'county_id')) {
      this.activeCounty = [{ id: this.terminal.county_id.id, text: this.terminal.county_id.name }];
      // this.formData.county = this.activeCounty;
    }
    this.formData.address = this.terminal.address || '';
    if (this.utilsService.hasProp(this.terminal, 'longitude')) {
      this.formData.longitude = this.terminal.longitude.toString();
    }
    if (this.utilsService.hasProp(this.terminal, 'latitude')) {
      this.formData.latitude = this.terminal.latitude.toString();
    }
    this.formData.capacity = this.terminal.capacity.toString() || '';
    if (this.utilsService.hasProp(this.terminal, 'capacity')) {
      this.formData.capacity = this.terminal.capacity.toString();
    }
    if (this.utilsService.hasProp(this.terminal, 'is_pml_operational')) {
      this.formData.is_pml_operational = this.terminal.is_pml_operational.toString();
    }
    if (this.utilsService.hasProp(this.terminal, 'is_pmt_operational')) {
      this.formData.is_pmt_operational = this.terminal.is_pmt_operational.toString();
    }
    if (this.utilsService.hasProp(this.terminal, 'is_pmt_online')) {
      this.formData.is_pmt_online = this.terminal.is_pmt_online.toString();
    }
    this.formData.photo = this.terminal.photo || '';
    if (this.utilsService.hasProp(this.terminal, 'flw_subaccount_id')) {
      this.formData.flw_subaccount_id = this.terminal.flw_subaccount_id.subaccount_id;
    }

    console.log('\nTerminal Name', typeof this.terminal, this.terminal);

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
    const payload = this.editForm.value;
    payload.id = this.terminal.id;
    console.log('editForm payload ', payload);
    payload.city_id = payload.city.id;
    payload.county_id = payload.county.id;
    delete payload.city;
    delete payload.county;
    this.apiService.updateTerminal(payload).pipe(first()).subscribe(data => {
          this.response = data;
          this.terminal = this.response.payload;
          if (this.response.success) {
            alert('User updated successfully.');
            this.router.navigate(['terminal']); // list-terminal
            // Update Local Content
            window.localStorage.setItem('terminal', JSON.stringify(this.response.payload));
            window.localStorage.setItem('terminal_updated', JSON.stringify(new Date()));
          } else {
            alert(this.response.message);
          }


        },
        error => {
          alert(error);
        });
  }

  getRecord(terminalId) {
    console.log('\nTerminal Id ', terminalId);
    const storedRecords = window.localStorage.getItem('terminal');
    const updated = window.localStorage.getItem('terminal_updated');
    if (storedRecords) {
        this.terminals = JSON.parse(storedRecords);
        console.log(`Records retrieved since ${updated}`);
    }
    const t = this.apiService.getTerminal(this.terminals, terminalId);
    return t[0];
  }

  terminalAdd(): void {
    this.router.navigate(['terminal/add']);
  }

  goBack() {
    this.router.navigate(['terminal']);
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
