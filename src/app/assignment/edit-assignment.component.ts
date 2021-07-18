import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClassAssigment } from '../model/classassignment';
import { AssignmentSubmissionService } from '../service/assignment-submission.service';
import { map } from 'rxjs/operators';
import { UserService } from '../service/user.service';
import { AssignmentService } from '../service/assignment.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Assignment } from '../model/assignment';
import { AssignmentSubmission } from '../model/assignmentsubmission';
import { User } from '../model/user';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {


  cs: ClassAssigment[] = [];
  current_assigSub: AssignmentSubmission = new  AssignmentSubmission();
  assignmentSub: AssignmentSubmission = new  AssignmentSubmission();
  allassignmentSub: AssignmentSubmission[] = [];
  fassignmentsub: AssignmentSubmission[] = [];
  current_assignmentSub: AssignmentSubmission = new AssignmentSubmission();
  current_assign: Assignment = new Assignment();

  current_user: User;

  form: FormGroup = new FormGroup({});
  docfile: string= "";
  comments: string;


  constructor(private aservice: AssignmentService, private service : AssignmentSubmissionService, private userService: UserService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.current_user =  this.userService.getCurrentUser();

    this.route.queryParams.subscribe(params => {


      this.current_assign.assignmentid = params.assignmentid;
      this.current_assign.title = params.title;
      this.current_assign.description = params.description;
      this.current_assign.status = params.status;


     });


     this.service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.allassignmentSub = data;

    });



    this.form = new FormGroup({
      file: new FormControl()
    });

    this.getClassAssignment();



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


      //saving assignment submission
      this.save();

      console.log(this.docfile);


}

getClassAssignment() {

  this.service.getSubbmissionByAssig(this.current_assign.assignmentid).snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.fassignmentsub  =data;
    console.log(this.fassignmentsub);

    for(let i =0; i < this.fassignmentsub.length; i ++){
      var x  = this.fassignmentsub[i];
      if(x.userid == this.current_user.userid){
         this.current_assigSub = x;
         this.docfile = this.current_assigSub.docfile;
         console.log(this.docfile);

      }

    }

  });
}


save(){

  var file = this.form.get("file")?.value;

  this.assignmentSub.created = new Date().toLocaleDateString();
  let id  = this.allassignmentSub.length + 1;
  this.assignmentSub.assignmentsubid = id;
  this.assignmentSub.userid = this.userService.getCurrentUser().userid;
  this.assignmentSub.assignmentid = this.current_assign.assignmentid;
  // this.assignmentSub.comments = this.comments;
  this.assignmentSub.docfile = file.name;

  this.service.create(this.assignmentSub);



}

gotoSimilarityView(){
  let navigationExtras: NavigationExtras = {
    queryParams: {

       "docfile":this.docfile
    }
  };

  this.router.navigate(["similarity-submission-report"], navigationExtras);
}


}
