import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'api/success?';


@Component({
  selector: 'app-assignment-submission-list',
  templateUrl: './assignment-submission-list.component.html',
  styleUrls: ['./assignment-submission-list.component.css']
})
export class AssignmentSubmissionListComponent implements OnInit {

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;



  constructor() {

    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );

  }


  ngOnInit(): void {
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
