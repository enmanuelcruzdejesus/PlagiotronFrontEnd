import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientHelper } from './HttpHelper';

@Injectable({
  providedIn: 'root'
})
export class AssignmentSubmissionService {

  constructor(private httpClient: HttpClient) { }

  createAssignmentSubmission(formData: FormData): Observable<any>{

    return this.httpClient.post<any>(`${HttpClientHelper.baseURL}/success`,formData);

  }
}
