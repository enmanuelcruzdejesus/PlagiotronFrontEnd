import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssignmentSubmissionService } from '../service/assignment-submission.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {



  form: FormGroup = new FormGroup({});


  constructor(private service : AssignmentSubmissionService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      file: new FormControl()
    });

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

}
