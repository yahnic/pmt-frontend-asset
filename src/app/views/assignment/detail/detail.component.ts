import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, UtilsService } from '../../../_services';
import { Assignment, Vehicle, Staff, Driver } from '../../../_models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  assignments: Array<Assignment>;
  assignment: Assignment;

  id = '';
  user_type = '';
  staff: Staff;
  driver: Driver;
  request_date = '';
  task_id = '';
  asset_type = '';
  vehicle: Vehicle;
  asset_id = '';
  issured_date = '';
  issued_by = '';
  issuer_remark = '';
  request_status = '';
  assignment_status = '';
  is_returnable = '';
  expected_returned_date = '';
  actual_returned_date = '';
  collected_date = '';
  collected_by = '';
  collected_remark = '';

  response: any;
  success = false;
  message = '';

  constructor( private router: Router, private apiService: ApiService, private utilsService: UtilsService) { }

  ngOnInit() {
    const assignmentId = window.localStorage.getItem('assignmentDetail');
    if (!assignmentId) {
      alert('Invalid action! No assignmentId ');
      this.router.navigate(['assignment']); // list-assignment
      return;
    }
  this.assignment = this.utilsService.cleanObject(this.getRecord(assignmentId));
    this.user_type = this.assignment.user_type || '';
    this.asset_type = this.assignment.asset_type || '';
    this.issued_by = this.assignment.issued_by || '';
    if (  this.utilsService.hasProp(this.assignment, 'vehicle_id')) {
    this.vehicle = this.assignment.vehicle_id;
    }
    this.staff = this.assignment.staff_id;
    if (  this.utilsService.hasProp(this.assignment, 'driver_id')) {
      this.driver = this.assignment.driver_id;
    }
   // this.driver = this.assignment.driver_id;

    console.log('\nAssignment Name', typeof this.assignment, this.assignment);
  }
  getRecord(assignmentId) {
    console.log('\nAssignmet Id ', assignmentId);
    const storedRecords = window.localStorage.getItem('assignments');
    if (storedRecords) {
        this.assignments = JSON.parse(storedRecords);
        this.success = true;
     //   console.log ()
    }
    console.log(assignmentId);
    const t = this.apiService.getOneAssignment(this.assignments , assignmentId);
    return t[0];
  }
  getAssignment(assignments, id): Assignment {
    return assignments.filter(obj => obj.id === id);
}
  assignmentEdit(assignment: Assignment): void {
    window.localStorage.removeItem('assignmentEditId');
    window.localStorage.setItem('assignmentEditId', assignment.id);
    this.router.navigate(['assignment/edit']);
  }

  assignmentAdd(): void {
    this.router.navigate(['assignment/add']);
  }

  goBack() {
    this.router.navigate(['assignment']);
  }

}
