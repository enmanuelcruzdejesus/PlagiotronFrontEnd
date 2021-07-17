import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ClassAssigment } from '../model/classassignment';

@Injectable({
  providedIn: 'root'
})
export class ClassassignmentService {
  private dbPath = "/classassignments";

  private classAssignments: AngularFireList<ClassAssigment>;

  constructor(private db: AngularFireDatabase) {
    this.classAssignments = this.db.list(this.dbPath);
   }


   getAll(): AngularFireList<any>{
    return this.db.list(this.dbPath);

  }

  getByClass(classid: string): AngularFireList<any>{

    return this.db.list(this.dbPath,ref => ref.orderByChild('classid').equalTo(classid));
  }



}
