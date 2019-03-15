import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService, UtilsService } from '../../../_services';
import { ApiResponse, Assignment, SelectOptionInterface } from '../../../_models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

      assignments: Array<Assignment>;
      assignment: Assignment;

     editForm: FormGroup;
     response: ApiResponse;

   private value = {};

   constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private utilsService: UtilsService) { }

   ngOnInit() {
    const assignmentId = window.localStorage.getItem('assignmentEditId');
    if (!assignmentId) {
      alert('Invalid action.');
      this.router.navigate(['assignment']); // list assignment
      return;
      }


    this.editForm = this.formBuilder.group({
      user_type: [''],
      staff_id: [''],
      driver_id: [''],
      request_date: [''], // date
      task_id: [''],
      asset_type: [''],
      vehicle_id: [''],
      asset_id: [''],
      issued_date: [''], // date
      issued_by: [''],
      issuer_remark: [''],
      request_status: [''],
      assignment_status: [''],
      is_returnable: [''], // boolean;
      expected_returned_date: [''], // date
      actual_returned_date: [''], // date
      collected_date: [''], // date
      collected_by: [''],
      collected_remark: [''],
    });
  this.assignment = this.utilsService.cleanObject(this.getRecord(assignmentId));

    this.editForm.get('user_type').setValue(this.assignment.user_type || '');
    this.editForm.get('staff_id').setValue(this.assignment.staff_id || '');
    this.editForm.get('driver_id').setValue(this.assignment.driver_id || '');
    this.editForm.get('request_date').setValue(this.assignment.request_date || '' );
    this.editForm.get('task_id').setValue(this.assignment.task_id || '');
    this.editForm.get('asset_type').setValue(this.assignment.asset_type || '');
    this.editForm.get('vehicle_id').setValue(this.assignment.vehicle_id || '');
    this.editForm.get('asset_id').setValue(this.assignment.asset_id || '');
    this.editForm.get('issued_date').setValue(this.assignment.issued_date || '');
    this.editForm.get('issued_by').setValue(this.assignment.issued_by || '');
    this.editForm.get('issuer_remark').setValue(this.assignment.issuer_remark || '');
    this.editForm.get('request_status').setValue(this.assignment.request_status	 || '');
    this.editForm.get('assignment_status').setValue(this.assignment.assignment_status || '');
    this.editForm.get('is_returnable').setValue(this.assignment.is_returnable || '');
    this.editForm.get('expected_returned_date').setValue(this.assignment.expected_returned_date || '');
    this.editForm.get('actual_returned_date').setValue(this.assignment.actual_returned_date || '');
    this.editForm.get('collected_date').setValue(this.assignment.collected_date || '');
    this.editForm.get('collected_by').setValue(this.assignment.collected_by || '');
    this.editForm.get('collected_remark').setValue(this.assignment.collected_remark || '');

    console.log('\nAssignment Name', typeof this.assignment, this.assignment);
  }
    onSubmit() {
      const payload = this.editForm.value;
      payload.id = this.assignment.id;
      console.log('editForm payload ', payload);
      this.apiService.updateAssignment(payload).pipe(first()).subscribe(data => {
            this.response = data;
            this.assignment = this.response.payload;
            if (this.response.success) {
              alert('User updated successfully.');
              this.router.navigate(['assignment']); // list-assignment
              // Update Local Content
             // window.localStorage.setItem('offence', JSON.stringify(this.response.payload));
              window.localStorage.setItem('assignment_updated', JSON.stringify(new Date()));
            } else {
              alert(this.response.message);
            }


          },
          error => {
            alert(error);
          });
    }

    getRecord(assignmentId) {
      console.log('\nAssignment Id ', assignmentId);
      const storedRecords = window.localStorage.getItem('assignment');
      const updated = window.localStorage.getItem('assignment_updated');
      if (storedRecords) {
          this.assignments = JSON.parse(storedRecords);
          console.log(`Records retrieved since ${updated}`);
      }
      const t = this.apiService.getAssignment(assignmentId);
      return t[0];
    }

    assignmentAdd(): void {
      this.router.navigate(['assignment/add']);
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
