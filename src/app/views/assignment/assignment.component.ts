import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services';
import { Router } from '@angular/router';
import { Assignment, ApiResponse, Terminal } from '../../_models';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})


export class AssignmentComponent implements OnInit {

  response: any;
  success = false;
  message = '';
  assignments: Array<Assignment>;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    const storedRecords = window.localStorage.getItem('assignments');
    console.log('storedRecords ', storedRecords);
    if (storedRecords) {
        this.assignments = JSON.parse(storedRecords);
        this.success = true;
    } else {
      this.assignmentRetrieve();
    }
  }

  assignmentRetrieve(): void {
    this.apiService.getAssignment().subscribe(data => {
      this.response = data;
      this.assignments = this.response.payload;
      this.success = this.response.success;
      this.message = this.response.message;
      if (this.response.success) {
        window.localStorage.setItem('assignments', JSON.stringify(this.response.payload));
      }
    });
  }

  assignmentDetail(assignment: Assignment): void {
    window.localStorage.removeItem('assignmentDetail');
    window.localStorage.setItem('assignmentDetail', assignment.id);
    this.router.navigate(['assignment/detail'])
      .then(nav => { console.log(nav); }, err => {console.log(err); });
    console.log('Navigating to assignment detail');
    return;
  }

  assignmentDelete(assignment: Assignment): void {
    this.apiService.assignmentDelete(assignment.id).subscribe((data: any) => {
        this.assignments = this.assignments.filter(i => i.id !== assignment.id);
        window.localStorage.setItem('assignments', JSON.stringify(this.assignments));
      });
  }

  assignmentEdit(assignment: Assignment): void {
    window.localStorage.removeItem('assignmentEditId');
    window.localStorage.setItem('assignmentEditId', assignment.id);
    this.router.navigate(['assignment/edit']);
  }

  assignmentAdd(): void {
    this.router.navigate(['assignment/add']);
  }
}
