import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  _list: User[];
  _userObserveList: Subject<User[]>;
  _editUserObserve: Subject<User>;


  constructor() {
    console.log("Repo initialized()")
    // let user = new User();
    // user.id = "admin"
    // user.name = "Admin"
    // user.password = "this@is@testing@passord"
    // user.role = "manager"
    // this._list = [user, user, user];
    this._list = [];
    this._editUserObserve = new BehaviorSubject(new User());
    this._userObserveList = new BehaviorSubject(this._list);
  }

  addUser(user: User) {
    console.log("addUser()::" + user)
    let savedUser = this._list.find(item => item.id == user.id)
    if (savedUser != undefined) {
      let index = this._list.indexOf(savedUser)
      this._list[index] = user
    } else {
      this._list.push(user)
    }

    this._userObserveList.next(this._list);
    console.log("addUser()::" + this._list)
  }

  resetList() {
    console.log("resetList()::")
    this._list =[]
    this._userObserveList.next(this._list);
   }

  get getAllUser(): Observable<User[]> { return this._userObserveList.asObservable(); }
  get getCurrentUser(): Observable<User | null> { return this._editUserObserve.asObservable(); }


  removeUser(user: User) {
    console.log("removeUser()::" + user)
    // this.allUserlist.reduce()

  }

  editUser(user: User) {
    this._editUserObserve.next(user)
    console.log("editUser()::" + user)
    // this.allUserlist.reduce()

  }

  resetCurrrentUser() {
    this._editUserObserve.next(new User())
  }

}
