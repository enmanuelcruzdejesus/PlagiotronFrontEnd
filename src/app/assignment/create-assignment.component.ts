import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from '../model/assignment';
import { AssignmentService } from '../service/assignment.service';


@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {

  assignment: Assignment = new Assignment();
  as: Assignment[] = [];
  constructor(private service: AssignmentService, private router: Router) { }

  ngOnInit(): void {
  }


  cancelPost(){
    this.assignment = new Assignment();
    this.router.navigate(['/class-assignment-list']);
  }

  save(){
    this.assignment.created = new Date().toLocaleDateString();
    let id  = this.as.length + 1;
    this.assignment.assignmentid = id;
    this.service.create(this.assignment);
    this.router.navigate(['/class-assignment-list']);
  }

}
