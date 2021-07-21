import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User {
  constructor(
    public status: string,
  ) { }

}

export class JwtResponse {
  constructor(
    public jwttoken: string,
  ) { }

}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticate = false;

  constructor(private httpClient: HttpClient) { }

  authenticate(username: any, password: any) {
    return this.httpClient.post<any>('http://localhost:8080/authenticate', { username, password }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let tokenStr = 'Bearer ' + userData.token;
          // console.log("tokenstr",tokenStr);
          sessionStorage.setItem('token', tokenStr);
          
          return userData;
        }
      )

    );
  }

  isUserLoggedIn(): boolean {
    let value = sessionStorage.getItem('isLoggedIn');
    if(value == "true") {
      this.isAuthenticate = true;
      return this.isAuthenticate;
    } else {
      return this.isAuthenticate;
    }
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
