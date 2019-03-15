import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../_services';
import { Assignment, ApiResponse, SelectOptionInterface } from '../../../_models';

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
      id: [''],
      user_type: [''],
      staff_id: [''],
      driver_id: [''],
      request_date: [''],
      task_id: [''],
      asset_type: [''],
      vehicle_id: [''],
      asset_id: [''],
      issued_date: [''],
      issued_by: [''],
      issuer_remark: [''],
      request_status: [''],
      assignment_status: [''],
      is_returnable: [''], // boolean;
      expected_returned_date: [''],
      actual_returned_date: [''],
      collected_date: [''],
      collected_by: [''],
      collected_remark: [''],
    });


  }

  onSubmit() {
    const payload = this.addForm.value;
    console.log('Form input ', payload);
    this.apiService.createAssignment(payload).subscribe( data => {
      console.log(data);
      if (data.success) {
        window.localStorage.setItem('assignmentDetail', data.payload.id);
        this.router.navigate(['assignment/detail']);
      } else {
        console.log(data.message);
      }
        this.router.navigate(['assignment']);
      });
  }

  goBack() {
    this.router.navigate(['assignment']);
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
