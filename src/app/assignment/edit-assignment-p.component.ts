import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../model/assignment';
import { AssignmentService } from '../service/assignment.service';

@Component({
  selector: 'app-edit-assignment-p',
  templateUrl: './edit-assignment-p.component.html',
  styleUrls: ['./edit-assignment-p.component.css']
})
export class EditAssignmentPComponent implements OnInit {

  assignment: Assignment;
  as: Assignment[] = [];
  constructor(private service: AssignmentService, private router: Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.assignment.assignmentid = params.assignmentid;
      this.assignment.title = params.title;
      this.assignment.description = params.description;
      this.assignment.duedate = params.duedate;


  });
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
