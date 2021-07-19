import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AssignmentSubmission } from '../model/assignmentsubmission';
import { AssignmentSubmissionService } from '../service/assignment-submission.service';
import { map } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

// const URL = '/api/';
const URL = 'api/success?';


@Component({
  selector: 'app-assignment-submission-list',
  templateUrl: './assignment-submission-list.component.html',
  styleUrls: ['./assignment-submission-list.component.css']
})
export class AssignmentSubmissionListComponent implements OnInit {

  allsubs: AssignmentSubmission[] = [];


  constructor(private service : AssignmentSubmissionService,private router: Router) {


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
      this.allsubs = data;

      console.log(this.allsubs);
    });
  }

  showResults(value: AssignmentSubmission){
    let navigationExtras: NavigationExtras = {
      queryParams: {

         "docfile":value.docfile
      }
    };

    this.router.navigate(["similarity-submission-report"], navigationExtras);

  }


}
