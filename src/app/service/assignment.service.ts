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

  create(c: Assignment){
    this.cs.push(c).then(value =>{
      console.log(value);
    });
  }

  update(key: string, value: any): Promise<void>{
    return this.cs.update(key,value);

  }

  delete(key: string): Promise<void>{
    return this.cs.remove(key);
  }



}
