import { Component, OnInit } from '@angular/core';
import { Assignment } from '../model/assignment';
import { ClassAssigment } from '../model/classassignment';
import { AssignmentService } from '../service/assignment.service';
import { ClassassignmentService } from '../service/classassignment.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from '../model/class';

@Component({
  selector: 'app-class-assignment-list',
  templateUrl: './class-assignment-list.component.html',
  styleUrls: ['./class-assignment-list.component.css']
})
export class ClassAssignmentListComponent implements OnInit {

  clsa : ClassAssigment[] = [];
  assigments: Assignment[] = [];
  current_class : string;
  c: Class ;

  constructor(private service: ClassassignmentService, private aservice: AssignmentService,private route: ActivatedRoute, private router: Router) {



   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.current_class = params["classid"];
      console.log(this.current_class);

      this.service.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
          this.clsa = data;
          console.log(this.clsa);
      });



      // this.c.classid = params["classid"];
      // this.c.classname = params["classname"];
      // this.c.subjectarea = params["subjectarea"];
      // this.c.created = params["created"];

      // this.current_class = this.c.classid;

      // console.log(this.current_class);

      // this.getAssignmentByClass(this.);

  });



  }

  getAssignmentByClass(value: string) {
    this.service.getByClass(value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
        this.clsa = data;
        console.log(this.clsa);
    });
  }



}
