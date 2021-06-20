import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from '../model/class';
import { ClassService } from '../service/class.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  c = new Class();
  constructor(private service: ClassService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.c.key = params["key"];
      this.c.classid = params["classid"];
      this.c.classname = params["classname"];
      this.c.subjectarea = params["subjectarea"];
      this.c.created = params["created"];

  });
  }

  save(){
    console.log(this.c);
    this.service.update(this.c.key,{classname: this.c.classname, subjectarea: this.c.subjectarea});
    this.router.navigate(["class-list"])
  }

}
