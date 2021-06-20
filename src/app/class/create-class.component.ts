import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Class } from '../model/class';
import { ClassService } from '../service/class.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {

  cs: Class[] | undefined;
  c = new Class();
  id : number = 0;
  constructor(private service: ClassService, private router:Router) { }

  ngOnInit(): void {
  }

  get() {
    this.service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.cs = data;
      console.log("printing");
      this.id = this.cs.length + 1;
      this.c.classid  = this.id.toString();
      console.log(this.id);
    });
  }

  cancelPost(){
    this.c = new Class();
  }

  save(){
    this.c.created = new Date().toLocaleDateString();
    this.service.create(this.c);
    this.router.navigate(['']);
  }


}
