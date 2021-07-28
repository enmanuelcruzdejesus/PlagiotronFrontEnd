import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AssignmentSubmission } from '../model/assignmentsubmission';
import { ClassAssigment } from '../model/classassignment';
import { HttpClientHelper } from './HttpHelper';

@Injectable({
  providedIn: 'root'
})
export class AssignmentSubmissionService {

  private httpOptions = {
    headers : new HttpHeaders({"Content-Type":"application/json"})
  };

  private httpOptions2 = {
    headers : new HttpHeaders({"Content-Type":"text/plain"})
  };

  private dbPath = "/assignmentsubmissions"

  private submissions: AngularFireList<AssignmentSubmission>;

  constructor(private httpClient: HttpClient,private db: AngularFireDatabase) {

      this.submissions = db.list(this.dbPath);
   }





  createAssignmentSubmission(formData: FormData): Observable<any>{

    return this.httpClient.post<any>(`${HttpClientHelper.baseURL}/uploadFile`,formData);

  }
  getdocumentContent(id: string): Observable<string>{

    return this.httpClient.get<string>(`${HttpClientHelper.baseURL}/getdocumentContent/`+id , this.httpOptions);

  }
  downloadDoc(id: string): Observable<any>{

    return this.httpClient.get<string>(`${HttpClientHelper.baseURL}/download/`+id , this.httpOptions);

  }

  getSubmissionSimilarity(id: string): Observable<any>{
    return this.httpClient.get<any>(`${HttpClientHelper.baseURL}/similarityReport/`+id,this.httpOptions);

  }



  create(c: AssignmentSubmission){
    this.submissions.push(c).then(value =>{
      console.log(value);
    });
  }

  update(key: string, value: any): Promise<void>{
    return this.submissions.update(key,value);

  }

  delete(key: string): Promise<void>{
    return this.submissions.remove(key);
  }

  get(){
    return new Promise((resolve,reject)=>{
      this.db.list(this.dbPath).valueChanges().subscribe(value=>{
        resolve(value);
      })
    })
  }

  getAll(): AngularFireList<any>{
    return this.db.list(this.dbPath);

  }



  getSubbmissionByAssig(assignmentid : number): AngularFireList<any>{
    return this.db.list(this.dbPath, ref => ref.orderByChild("assignmentid").equalTo(assignmentid));

  }
}
