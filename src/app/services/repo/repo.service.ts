import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  // var alphas:string[]; 
  allUserlist: User[];


  constructor() {
    console.log("Repo initialized()")
    let user = new User();
    user.id = "admin"
    user.name = "Admin"
    user.role = "Manager"
    this.allUserlist = [user];
  }


  addUser(user: User) {
    console.log("addUser()::" + user)

  }

  getAllUser(): User[] {
    console.log("getAllUser()")

    return [];
  }
  removeUser(user: User) {
    console.log("removeUser()::" + user)
  }


}
