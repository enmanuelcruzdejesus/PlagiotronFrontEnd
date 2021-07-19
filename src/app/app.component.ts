import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlagiotronFrontEnd';
  currentUser: User;
  constructor(private service: UserService, private router: Router ){

    this.currentUser = this.service.getCurrentUser();

  }



 showNav(){
   return this.service.IsLoggedIn();
 }
 userLoggedIn(){
   return this.service.IsLoggedIn();
 }
 Logout(){
  this.service.logout();
 this.router.navigate(['login']);
 }


 showPanel(){
  if(this.currentUser === null || undefined)  return false;
  if(this.currentUser.role === "ADMIN")
   return true;
  else
    return false;
}


}
