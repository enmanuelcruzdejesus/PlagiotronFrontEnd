import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import {User} from '../model/user';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user = new User();
  constructor(private service: UserService, private router: Router) { }


  ngOnInit(): void {
  }

  async Login(){
    await this.service.login(this.user.email,this.user.password);
     this.router.navigate(["user-class-list"]);

   }
}
