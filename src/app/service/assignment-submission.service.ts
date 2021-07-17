import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
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

  private dbPath = "/classassignments"

  private dbClass: AngularFireList<ClassAssigment>;

  constructor(private httpClient: HttpClient,private db: AngularFireDatabase) {

      this.dbClass = db.list(this.dbPath);
   }

  createAssignmentSubmission(formData: FormData): Observable<any>{

    return this.httpClient.post<any>(`${HttpClientHelper.baseURL}/success`,formData);

  }
  getdocumentContent(id: string): Observable<string>{

    return this.httpClient.get<string>(`${HttpClientHelper.baseURL}/getdocumentContent/`+id , this.httpOptions);

  }

  getSubmissionSimilarity(id: string): Observable<any>{
    return this.httpClient.get<any>(`${HttpClientHelper.baseURL}/similarityReport/`+id,this.httpOptions);

  }



  getClassAssignment(classs_id : string): AngularFireList<any>{
    return this.db.list(this.dbPath, ref => ref.orderByChild("classid").equalTo(classs_id));

  }
}
