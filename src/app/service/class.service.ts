import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Class } from '../model/class';


@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private dbPath = "/class"

  private  cs : AngularFireList<Class>;

  constructor(private db: AngularFireDatabase) {

    this.cs = this.db.list(this.dbPath);
  }

  create(c: Class){
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

  getClassByName(value: string): AngularFireList<any>{

    return this.db.list(this.dbPath,ref => ref.orderByChild('classname').equalTo(value));
  }




}
