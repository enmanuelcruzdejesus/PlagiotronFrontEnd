import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Assignment } from '../model/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private dbPath = "/assignments"

  private  cs : AngularFireList<Assignment>;

  private assignments: AngularFireList<Assignment>;

  constructor(private db: AngularFireDatabase) {
    this.assignments = this.db.list(this.dbPath);
   }

   getAll(): AngularFireList<any>{
    return this.db.list(this.dbPath);

  }

  getById(value: number): AngularFireList<any>{

    return this.db.list(this.dbPath,ref => ref.orderByChild('assignmentid').equalTo(value));
  }




}
