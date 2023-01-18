import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  readonly USER = "USER";
  readonly id = "id";
  readonly token = "token";
  readonly key1 = "key1";
  readonly key2 = "key2";
  readonly key3 = "key3";


  constructor() { }

  checkIfLoggedIn(): boolean {
    console.log("checkIfLoggedIn()");

    const user = this.getUser();
    if (user == null) {
      console.log("USER not logged()");

      return false
    }
    console.log(`USER is logged ${user}`);

    return true;
  }


  saveUser(user?: User) {
    // console.log("saveUser", user);

    if (user == null) {
      localStorage.setItem(this.USER, "");
    }
    let userString = JSON.stringify(user);
    localStorage.setItem(this.USER, userString);
  }

  getUser(): User | null {
    let userString = localStorage.getItem(this.USER);

    if (userString == null || userString == "") {
      return null;
    }
    let user: User = <User>JSON.parse(userString);
    // console.log("getUser()", userString)

    return user;
  }


  logout(): void {
    localStorage.clear();
  }

}
