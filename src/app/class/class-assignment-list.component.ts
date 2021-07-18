import { Component, OnInit } from '@angular/core';
import { Assignment } from '../model/assignment';
import { ClassAssigment } from '../model/classassignment';
import { AssignmentService } from '../service/assignment.service';
import { ClassassignmentService } from '../service/classassignment.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Class } from '../model/class';
import { ClassService } from '../service/class.service';

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
  current_assig: Assignment;
  searchTerm: string = "";

  constructor(private service: ClassassignmentService, private aservice: AssignmentService,private clservice: ClassService,private route: ActivatedRoute, private router: Router) {



   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.current_class = params["classid"];
      var x = Number(this.current_class);
      this.getAssignmentByClass(x);
      this.fassignments =  this.getAllAssignments();

      console.log(this.current_class);

     });

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
        // console.log(data);
    });
  }

  getAllAssignments(){
    let result: Assignment[] = [];
    this.aservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
        this.assigments = data;


        for(let i =0; i< this.assigments.length; i++){
           var  a = this.assigments[i];
           console.log(i);
           for(let j =0; j < this.clsa.length; j++){
             var b = this.clsa[j].assignmentid;
             if(a.assignmentid == b){
              // this.fassignments.push(a);
              result.push(a);
             }
           }
        }

    });
    return result;
  }


  getUserAssignments() {
    this.aservice.getByTitle(this.searchTerm).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.fassignments = data;
      console.log("printing");
    });
  }


  Filter(value: string){
    if(value != undefined && value != null && value != "")
    this.getUserAssignments();
    else{
      this.fassignments = this.getAllAssignments();
    }
  }


  gotoEditAsig(c: Assignment){

      let navigationExtras: NavigationExtras = {
        queryParams: {
            "key": c.key,
            "assignmentid": c.assignmentid,
            "title": c.title,
            "description": c.description,
            "duedate": c.duedate,
            "status": c.status

        }
      };

      this.router.navigate(["edit-assignment"], navigationExtras);

  }

  update(c: Assignment){
    let navigationExtras: NavigationExtras = {
      queryParams: {

          "assignmentid": c.assignmentid,
          "title": c.title,
          "description": c.description,
          "duedate": c.duedate,
          "status": c.status

      }
    };
    this.router.navigate(["edit-assignment-p"], navigationExtras);

  }


  create(){
    this.router.navigate(["create-assignment"])
  }

  delete(task: Assignment) {
    this.aservice.delete(task.key);
  }


}
