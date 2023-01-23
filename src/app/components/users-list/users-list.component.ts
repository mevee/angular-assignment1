import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { PeriodicElement } from 'src/app/models/user_table_element';
import { RepoService } from 'src/app/services/repo/repo.service';
import { RouteConsts } from 'src/app/util/route-constants';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['User name', 'password', 'role', 'action'];
  userList: User[];
  // userList: _userList.asObservable;



  constructor(private repo: RepoService, private router: Router) {
    this.userList = []

  }

  ngOnInit(): void {
    this.repo.getAllUser.subscribe((value) => {
      this.userList = value
      console.log("UsersListComponent :: " + this.userList)
    });
  }


  addItem() {
    let user = new User();
    user.id = "Name" + Math.floor(Math.random() * 10000)
    user.name = "Name" + Math.floor(Math.random() * 10000)
    user.password = "Name" + Math.floor(Math.random() * 10000)
    user.role = "Manager"
    this.repo.addUser(user)
  }

  editUser(user: User) {
    this.repo.editUser(user);
    this.router.navigate([RouteConsts.DASHBOARD + '/' + RouteConsts.ADD_USER]);
  }

}
