import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassAssigment } from '../model/classassignment';
import { AssignmentSubmissionService } from '../service/assignment-submission.service';
import { map } from 'rxjs/operators';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {


  cs: ClassAssigment[] = [];


  form: FormGroup = new FormGroup({});


  constructor(private service : AssignmentSubmissionService, private userService: UserService) { }

  ngOnInit(): void {

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
