import { Component, OnInit } from '@angular/core';
import { AssignmentSubmissionService } from '../service/assignment-submission.service';
import { FormGroup, FormControl } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';




@Component({
  selector: 'app-similarity-submission-report',
  templateUrl: './similarity-submission-report.component.html',
  styleUrls: ['./similarity-submission-report.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]

})
export class SimilaritySubmissionReportComponent implements OnInit {

  docText: string = "hello";
  similarityResult : any;
  docFile: string = "orig_taske.txt";
  selectedDocTxt: string= "";
  selectedFile: string = "doc1";
  selectedIndex: number = 0;


  constructor(private service: AssignmentSubmissionService) { }

  ngOnInit(): void {

    this.service.getdocumentContent(this.docFile).subscribe((res: any)=>
    {
       this.docText = res.content;
        console.log(res);

    });

    this.service.getSubmissionSimilarity(this.docFile).subscribe((res)=>{
      this.similarityResult = res;
      this.selectedDocTxt = res.docs[0].doc_content;

    });

  }

  onChange(event: Number) {
    var index = Number(event);
    console.log(event);
    var x  = this.similarityResult.docs[index].doc_content;
    this.selectedDocTxt = x;
  }

}
