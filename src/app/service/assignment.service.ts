import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Assignment } from '../model/assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private dbPath = "/assignments"



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

  getByTitle(value: string): AngularFireList<any>{

    return this.db.list(this.dbPath,ref => ref.orderByChild('title').equalTo(value));
  }

  create(c: Assignment){
    this.assignments.push(c).then(value =>{
      console.log(value);
    });
  }

  update(key: string, value: any): Promise<void>{
    return this.assignments.update(key,value);

  }

  delete(key: string): Promise<void>{
    return this.assignments.remove(key);
  }



}
