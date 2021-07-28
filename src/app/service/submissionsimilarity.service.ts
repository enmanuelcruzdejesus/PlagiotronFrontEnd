import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { SubmissionSimilarities } from '../model/submissionsimilarities';
import { SubmissionSimilarity } from '../model/submissionsimilarity';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsimilarityService {

  private dbPath = "/submissionsimilarity";

  private s: AngularFireList<SubmissionSimilarity>;

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) { 
    this.s = db.list(this.dbPath);
  }


  getAll(): AngularFireList<any>{
    return this.db.list(this.dbPath);

  }

}
