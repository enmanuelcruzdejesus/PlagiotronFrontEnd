import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassAssigment } from '../model/classassignment';
import { AssignmentSubmissionService } from '../service/assignment-submission.service';
import { map } from 'rxjs/operators';
import { UserService } from '../service/user.service';
import { AssignmentService } from '../service/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../model/assignment';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {


  cs: ClassAssigment[] = [];

  current_assign: Assignment = new Assignment();
  form: FormGroup = new FormGroup({});


  constructor(private aservice: AssignmentService, private service : AssignmentSubmissionService, private userService: UserService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {


      this.current_assign.assignmentid = params.assignmentid;
      this.current_assign.title = params.title;
      this.current_assign.description = params.description;
      this.current_assign.status = params.status;


     });



    this.form = new FormGroup({
      file: new FormControl()
    });

    this.getClassAssignment();

    console.log(this.cs);


    console.log(this.userService.getCurrentUser());

  }

  uploadFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file')?.setValue(file,{emitModelToViewChange: false})
    }
  }

  postSubmission() : void{

    var formdata = new FormData();
    formdata.append("file",this.form.get("file")?.value);


    this.service.createAssignmentSubmission(formdata).subscribe((res)=>{

     console.log(res);


   },(err)=>{
     console.error(err);
   });


}

getClassAssignment() {
  this.service.getClassAssignment("-McbE9XwNct07aPQqQa9").snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.cs = data;
    console.log(this.cs);
  });
}

}
