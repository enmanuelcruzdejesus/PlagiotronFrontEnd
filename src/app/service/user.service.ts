import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../model/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = "/users"

  private  users: AngularFireList<User>;

  private currentUser : User = new User();

  private isLoggedIn :boolean  = false;

  constructor(private firebaseAuth : AngularFireAuth, private db: AngularFireDatabase ) {
      this.users = this.db.list(this.dbPath);
  }

  create(u: User){
    return this.users.push(u).then(value =>{
      console.log(value);
    });
  }

  getAll(): AngularFireList<any>{
    return this.db.list(this.dbPath);

  }

  getUserById(value: string): AngularFireList<any>{

    return this.db.list(this.dbPath,ref => ref.orderByChild('userid').equalTo(value));
  }



  getCurrentUser(): User{
    var j  = JSON.parse(localStorage.getItem('user'));
    console.log(j);
    var u = new User();

    if(j!= null || j!= undefined){

      u.userid = j.userid;
      u.email = j.email;
      u.role = j.role;






    }
    console.log("printing user from user service");
    console.log(u);

    return u;

  }

  async login(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password).then(res=>{
      this.isLoggedIn = true;

      var user = res.user;
      console.log(res.user);

      if(user!= undefined || user != null){
        this.getUserById(user.uid).snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(data => {
           var u = data[0];

          localStorage.setItem('user',JSON.stringify(u));


        });

      }





    });
  }

  async signUp(user: User){
    await this.firebaseAuth.createUserWithEmailAndPassword(user.email,user.password).then(res=>{
      localStorage.setItem('user',JSON.stringify(res.user));
      var u = new User();
      u.userid = res.user?.uid;
      u.email = user.email;
      u.password =  "";
      u.role = user.role;
      this.currentUser = u;
      this.create(u).then((t) =>{ console.log(t)}).catch((error)=>
      {
        console.error(error)
      });



    });
  }



   logout(): void{
     this.isLoggedIn = false;
     this.firebaseAuth.signOut();
     localStorage.removeItem("user");
  }





  IsLoggedIn(){
    return !!localStorage.getItem("user");
  }

}
