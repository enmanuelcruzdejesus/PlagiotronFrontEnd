import { Component, OnInit } from '@angular/core';
import { AssignmentSubmissionService } from '../service/assignment-submission.service';
import { FormGroup, FormControl } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AngularEditorComponent, AngularEditorConfig } from '@kolkov/angular-editor';




@Component({
  selector: 'app-similarity-submission-report',
  templateUrl: './similarity-submission-report.component.html',
  styleUrls: ['./similarity-submission-report.component.css']
})
export class SimilaritySubmissionReportComponent implements OnInit {

  docText: string = "hello";
  similarityResult : any;
  docFile: string = "orig_taske.txt";
  selectedDocTxt: string= "";
  selectedFile: string = "doc1";
  selectedIndex: number = 0;
  htmlContent: string = "<p> Hello There!</p> <p>Are you <b>ok</b> </p>";
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};



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
    var similar_s =   this.similarityResult.docs[index].similar_sentences
    var splitSelectedDocText = this.selectedDocTxt.split(".");
    console.log(splitSelectedDocText);
    let result = "";

    //highligthing similar words in red
    // console.log(x.similar_sentences);
    for(let i =0; i <  splitSelectedDocText.length; i++){

       if(splitSelectedDocText[i] === similar_s[i]){
         result =  result + "<p><b>"+splitSelectedDocText[i]+"</b></p>"
       }
       else{
         result =  result + "<p>"+splitSelectedDocText[i]+"</p>"
      }

    }
    console.log(result);
    this.selectedDocTxt = "";

    this.selectedDocTxt  = result;



  }

}
