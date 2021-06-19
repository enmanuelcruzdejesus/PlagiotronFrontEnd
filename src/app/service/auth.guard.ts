import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


 constructor(private userService: UserService, private router: Router){

 }

 canActivate():boolean{
  if(this.userService.IsLoggedIn()){
    return true;
  }else{
    this.router.navigate(["/login"]);
    return false;
  }
 }

}
