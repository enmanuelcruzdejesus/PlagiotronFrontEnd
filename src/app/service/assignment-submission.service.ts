import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private httpClient: HttpClient) { }

  createAssignmentSubmission(formData: FormData): Observable<any>{

    return this.httpClient.post<any>(`${HttpClientHelper.baseURL}/success`,formData);

  }
  getdocumentContent(id: string): Observable<string>{

    return this.httpClient.get<string>(`${HttpClientHelper.baseURL}/getdocumentContent/`+id , this.httpOptions);

  }

  getSubmissionSimilarity(id: string): Observable<any>{
    return this.httpClient.get<any>(`${HttpClientHelper.baseURL}/similarityReport/`+id,this.httpOptions);

  }
}
