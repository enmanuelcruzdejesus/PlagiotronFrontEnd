import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Enrollment } from '../model/enrollement';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private dbPath = "/enrollments"

  private  enrollments : AngularFireList<Enrollment>;


  constructor(private db: AngularFireDatabase) {
     this.enrollments = this.db.list(this.dbPath);
   }


   create(u: Enrollment){
    return this.enrollments.push(u).then(value =>{
      console.log(value);
    });
  }

  getAll(): AngularFireList<any>{
    return this.db.list(this.dbPath);

  }


  getByUser(userid: string): AngularFireList<any>{
    return this.db.list(this.dbPath,ref => ref.orderByChild('userid').equalTo(userid));

  }

}
