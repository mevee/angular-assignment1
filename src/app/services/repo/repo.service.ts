import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  // var alphas:string[]; 
  allUserlist: User[];
  userObs : Observable<User[]>;
  

  constructor() {
    console.log("Repo initialized()")
    let user = new User();
    user.id = "admin"
    user.name = "Admin"
    user.role = "Manager"
    this.allUserlist = [user,user,user];
    
    // this.userObs = new Observable();
    this.userObs =new Observable();

    this.userObs.

   }


  addUser(user: User) {
    console.log("addUser()::" + user)
    this.allUserlist.concat(user)
    this.userObs. = of(this.allUserlist);
    console.log("addUser()::" + this.allUserlist.length)
 
  }

  getAllUser(): Observable<User[]> {
    console.log("getAllUser()")

    return this.userObs;
  }

  removeUser(user: User) {
    console.log("removeUser()::" + user)
    // this.allUserlist.reduce()

  }


}
