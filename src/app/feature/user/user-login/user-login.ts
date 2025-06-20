import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLoginDTO } from '../../../model/user-login-dto';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user-service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.html',
  styleUrl: './user-login.css'
})

export class UserLogin implements OnInit,OnDestroy {
title: string='User-Login';
userLoginDTO: UserLoginDTO = new UserLoginDTO();
subscription!: Subscription;
user!: User;
message: string ='';

constructor(
  private userSvc: UserService, 
  private sysSvc: SystemService, 
  private router: Router) {}

ngOnInit(): void {
    this.userLoginDTO.email = 'hgilmore@happ.com';
    this.userLoginDTO.password = 'hockey';
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login() {
    // call the user userService.login(this.userLogin)
    // expected results????
    // - invalid stuff: invalid login - message displayed
    // - correct stuff: success login - forward to movie list component
    console.log("user login: ", this.userLoginDTO);
    this.subscription = this.userSvc.login(this.userLoginDTO).subscribe({
      next: (resp) => {
        // successful login
        this.sysSvc.loggedInUser = resp;
        // nav to movie-list
        this.router.navigateByUrl('/movie-list');
      },
      error: (err) => {
        // unsuccessful login
        this.message = 'Invalid login - bad username/pwd combo';
      },
    });
  }
}
