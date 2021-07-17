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
  fclsa: ClassAssigment[] = [];
  assigments: Assignment[] = [];
  fassignments : Assignment[] = []
  current_class : string;
  c: Class ;

  constructor(private service: ClassassignmentService, private aservice: AssignmentService,private route: ActivatedRoute, private router: Router) {



   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.current_class = params["classid"];

     });
     var x = Number(this.current_class);
     this.getAssignmentByClass(x);
     this.getAllAssignments();






  }

  getAssignmentByClass(value: number) {
    this.service.getByClass2(value).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
        this.clsa = data;
        console.log(data);
    });
  }

  getAllAssignments(){
    this.aservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
        this.assigments = data;
        console.log(this.assigments);
        console.log(this.clsa);

        for(let i =0; i< this.assigments.length; i++){
           var  a = this.assigments[i];
           console.log(i);
           for(let j =0; j < this.clsa.length; j++){
             var b = this.clsa[j].assignmentid;
             if(a.assignmentid == b){
              this.fassignments.push(a);
             }
           }
        }

    });
  }




}
