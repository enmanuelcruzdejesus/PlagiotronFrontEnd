import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../model/user';

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


  getCurrentUser(): User{
    var j  = JSON.parse(localStorage.getItem('user'));
    var u = new User();
    u.userid =j.uid;
    u.email = j.email;

    return u;

  }

  async login(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password).then(res=>{
      this.isLoggedIn = true;
      console.log(res);
      localStorage.setItem('user',JSON.stringify(res.user));


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
