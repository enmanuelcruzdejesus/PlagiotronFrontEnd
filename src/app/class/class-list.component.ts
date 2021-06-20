import { Component, OnInit } from '@angular/core';
import { Router ,NavigationExtras} from '@angular/router';
import { ClassService } from '../service/class.service';
import { map } from 'rxjs/operators';
import { Class } from '../model/class';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  cs: Class[] = [];
  searchTerm: string = "";
  constructor(private service: ClassService, private userService: UserService, private router: Router) {
    this.cs = [];
   }



  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.cs = data;
      console.log("printing");

      console.log(this.cs);
    });
  }

  getClassByName() {
    this.service.getClassByName(this.searchTerm).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.cs = data;
      console.log("printing");
    });
  }


  Filter(value: string){
    if(value != undefined && value != null && value != "")
    this.getClassByName();
    else{
      this.getAll();
    }
  }

  create(){
    this.router.navigate(["create-class"])
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
    this.service.delete(task.key);
  }

}
