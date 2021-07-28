import { Component, OnInit } from '@angular/core';
import { AssignmentSubmissionService } from '../service/assignment-submission.service';
import { FormGroup, FormControl } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AngularEditorComponent, AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmissionsimilarityService } from '../service/submissionsimilarity.service';
import { SubmissionSimilarities } from '../model/submissionsimilarities';
import { map } from 'rxjs/operators';
import { SubmissionSimilarity } from '../model/submissionsimilarity';




@Component({
  selector: 'app-similarity-submission-report',
  templateUrl: './similarity-submission-report.component.html',
  styleUrls: ['./similarity-submission-report.component.css']
})
export class SimilaritySubmissionReportComponent implements OnInit {

  docText: string = "hello";
  similarityResult : any;
  docFile: string;
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

 random_color_doc: string[] = [];
 splitDocText : string[] = [];
 submission_sim : SubmissionSimilarity;



  constructor(private service: AssignmentSubmissionService,private s: SubmissionsimilarityService ,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    //getting docfile
    this.route.queryParams.subscribe(params => {


     this.docFile = params.docfile;
    

     });



    this.service.getdocumentContent(this.docFile).subscribe((res: any)=>
    {
       this.docText = res.content;

    });

  

    // this.getAll();

    this.service.getSubmissionSimilarity(this.docFile).subscribe((res)=>{

      this.similarityResult = res;
     
      this.selectedDocTxt = res.docs[0].doc_content;

      for(let i =0; i< this.similarityResult.docs.length; i++){
        this.random_color_doc.push(this.getRandomColor());
      }

      this.splitDocText =  this.docText.split(".");


      
      this.matchedSentences();

      


    });

    




  }

  matchedSentences(){
     //for doc text

     var result = "";
     var docs = this.similarityResult.docs;
     var found  = 0;



     outer_loop:
     for(let i =0; i<  this.splitDocText.length; i++){
         var element = this.splitDocText[i];


         //getting all similar sentences from all docs
         for(let d = 0; d < docs.length; d++){
           //getting similar setences from the current doc
            var similar_sentences =  docs[d].similar_sentences;

            //getting the color of document
            var doc_color = this.random_color_doc[d];

            //searching for the matched sentences of current doc
            for(let x =0; x < similar_sentences.length; x++){
              var s = String(similar_sentences[x].u_sentence);
              s = s.substring(0,s.length-1);
              

              if(element.trim().normalize() === s.trim().normalize()){
                result =  result + "<p><span style='color: "+doc_color+";'>"+element+"</span></p>"

                    continue outer_loop;
                  }

            }


         }


         result =  result + "<p>"+element+"</p>"

       }
       this.docText = result;




  }

  onChange(event: Number) {
    this.matchedSentences()
    var index = Number(event);
    console.log(event);
    var x  = this.similarityResult.docs[index].doc_content;
    this.selectedDocTxt = x;
   
    var similar_sentences = this.similarityResult.docs[index].similar_sentences;
    console.log("printing similar sentences");
    console.log(similar_sentences);

    var splitSelectedDocText = this.selectedDocTxt.split(".");
    let result = "";



    var doc_color = this.random_color_doc[index];

   

   // repo document
    outer_loop:
    for(let i =0; i< splitSelectedDocText.length; i++){
        var element = splitSelectedDocText[i]
      
        for(let x =0; x < similar_sentences.length; x++){
          var s = String(similar_sentences[x].r_sentence);
          s = s.substring(0,s.length-1);

          
        

          if(element.trim().normalize() === s.trim().normalize()){
            // console.log("printing element");
            // console.log(element);
            // console.log("printing r sentence");
            // console.log(s);
                 result =  result + "<p><span style='color: "+doc_color+";'>"+element+"</span></p>"
                // result =  result + "<p><style ='color: red';>"+element+"</span></p>"
                //  console.log("coloreando palabra")
                 continue outer_loop;
               }

        }
        result =  result + "<p>"+element+"</p>"

    }

    this.selectedDocTxt = result;


  }

  getAll() {
    this.s.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      
      this.submission_sim = data[0];
      this.similarityResult = data;

      console.log("printing");

      console.log(this.submission_sim);
     
      this.selectedDocTxt = this.submission_sim.docs[0].doc_content;

      for(let i =0; i< this.submission_sim.docs.length; i++){
        this.random_color_doc.push(this.getRandomColor());
      }

      this.splitDocText =  this.docText.split(".");

      this.matchedSentences();
      
      
    });
  }

   getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
