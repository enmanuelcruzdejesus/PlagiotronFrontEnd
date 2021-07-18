import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../service/enrollment.service';
import { UserService } from '../service/user.service';
import { map } from 'rxjs/operators';
import { Enrollment } from '../model/enrollement';
import { ClassService } from '../service/class.service';
import { Class } from '../model/class';
import { User } from '../model/user';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-user-class-list',
  templateUrl: './user-class-list.component.html',
  styleUrls: ['./user-class-list.component.css']
})
export class UserClassListComponent implements OnInit {

  enrollments : Enrollment[] = [];
  cls : Class[] = [];
  ucls: Class[] = [];
  currentUser: User;
  searchTerm: string = "";

  constructor(private router: Router,private userService: UserService,private enrollmentService: EnrollmentService, private cs : ClassService) { }

  ngOnInit(): void {

    this.currentUser = this.userService.getCurrentUser();

    this.getEnrollmentByUser();
    //getting all classes
    this.ucls =  this.getUserClass();







  }

  getUserClass(){
    let result : Class[] = [];
    this.cs.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
        this.cls = data;


        for(let i =0; i < this.cls.length; i++){
          var  c = this.cls[i];

           for(let j =0; j < this.enrollments.length; j++){

             var e = this.enrollments[j];
             if(c.classid == e.classid)
               result.push(c);

           }

       }



    });

    return result;

  }


  getClassByName() {
    this.cs.getClassByName(this.searchTerm).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.ucls = data;
      console.log("printing");
    });
  }


  Filter(value: string){
    if(value != undefined && value != null && value != "")
    this.getClassByName();
    else{
      this.ucls = this.getUserClass();
    }
  }

  create(){
    this.router.navigate(["create-class"])
  }



getEnrollmentByUser() {
  this.enrollmentService.getByUser(this.currentUser.userid).snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
      this.enrollments = data;
  });
}
gotoAssignment(c: Class){
  let navigationExtras: NavigationExtras = {
    queryParams: {
        "key": c.key,
        "classid": c.classid,
        "classname": c.classname,
        "subjectarea": c.subjectarea,
        "status": c.status,
        "created": c.created
    }
  };

  this.router.navigate(["class-assignment-list"], navigationExtras);
}

update(c: Class){
  let navigationExtras: NavigationExtras = {
    queryParams: {
        "key": c.key,
        "classid": c.classid,
        "classname": c.classname,
        "subjectarea": c.subjectarea,
        "createdbyuser": this.userService.getCurrentUser(),
        "status": c.status,
        "created": c.created
    }
  };

this.router.navigate(["edit-class"], navigationExtras);
}


delete(task: Class) {
  this.cs.delete(task.key);
}


}
