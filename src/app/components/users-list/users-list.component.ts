import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Session } from 'inspector';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { PeriodicElement } from 'src/app/models/user_table_element';
import { RepoService } from 'src/app/services/repo/repo.service';
import { SessionService } from 'src/app/services/session/session.service';
import { RouteConsts } from 'src/app/util/route-constants';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['User name', 'password', 'role', 'action'];
  userList: any;
  searchKey = ''
  _originalList: User[];

  // userList: _userList.asObservable;

  constructor(private session: SessionService, private repo: RepoService, private router: Router, private _snackBar: MatSnackBar) {
    // this.userList = 
    this._originalList = []
    // this._userList =new BehaviorSubject(this.userList);

  }

  ngOnInit(): void {
    console.log("ngOnInit()")

    this.repo.getAllUser.subscribe((value) => {
      this.userList = value
      this._originalList = value
      // this.userList.push = value.reverse()

      console.log("UsersListComponent :: " + this.userList)
      this.showSnackBar("Last Item is " + this.userList.length)

    });

  }


  filterItem(keyEvent: KeyboardEvent) {

    console.log("filterItem() ::" + keyEvent)
    const key = (keyEvent.target as HTMLInputElement).value;
    if (key == "" || key == undefined) {
      this.userList = this._originalList
    } else {
      let filteredList = this._originalList.filter(item => item.name?.includes(key))
      this.userList = filteredList
    }
  }

  ngOnDestroy() {
    // this.repo.getAllUser.uns
  }
  addItem() {
    let user = new User();
    user.id = "Name" + Math.floor(Math.random() * 10000)
    user.name = "Name" + Math.floor(Math.random() * 10000)
    user.password = "Name" + Math.floor(Math.random() * 10000)
    user.role = "manager"

    this.repo.addUser(user)
    this.showSnackBar("User added and new list sized is " + this.userList.length)
  }

  editUser(user: User) {
    this.repo.editUser(user);
    this.router.navigate([RouteConsts.DASHBOARD + '/' + RouteConsts.ADD_USER]);
  }



  showSnackBar(message?: string,) {
    var m1: string = message != null ? message : "No message found"
    this._snackBar.open(m1, "OK", { duration: 400 });
  }

}
