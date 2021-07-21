import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, User } from 'src/app/service/authentication.service';
import { UserLogin } from 'src/app/model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userData: UserLogin = new UserLogin('Rashmi', 'rashmi');
  // username = ''
  // password = ''
  isLoggedIn = false;
  user = new FormGroup({
    "username": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required),
  });

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit(): void {
  }

  checkLogin() {
    console.log("user", this.user.value);
    this.userData = this.user.value;
    console.log("username", this.userData);
    this.service.authenticate(this.userData.username, this.userData.password).subscribe((res) => {
      this.isLoggedIn = true;
      sessionStorage.setItem("isLoggedIn", ""+this.isLoggedIn);
      this.service.isUserLoggedIn();
      this.router.navigate(['/product'])
    });
  }
    
}
