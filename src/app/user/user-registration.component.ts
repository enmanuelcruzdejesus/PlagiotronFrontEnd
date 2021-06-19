import { UserService } from '../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  user = new User();
  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {


  }

  async signUp(){
    await this.service.signUp(this.user);

    //create user in db


    this.router.navigate(["login"]);

  }
}
