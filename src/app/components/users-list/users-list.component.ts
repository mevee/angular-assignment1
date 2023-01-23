import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { PeriodicElement } from 'src/app/models/user_table_element';
import { RepoService } from 'src/app/services/repo/repo.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['User name', 'password', 'role'];
  userList: User[];
  // userList: _userList.asObservable;



  constructor(private respo: RepoService) {
    this.userList = respo.getAllUser();
  }

  ngOnInit(): void {

    this.respo.userObs.subscribe(
      val => {
        console.log("UsersListComponent :: " + val)
      },
      error => console.log("error"),
      () => console.log("complete"))
  }


  addItem() {
    let user = new User();
    user.id = "Name" + Math.floor(Math.random() * 10000)
    user.name = "Name" + Math.floor(Math.random() * 10000)
    user.password = "Name" + Math.floor(Math.random() * 10000)
    user.role = "Manager"
    this.respo.addUser(user)
  }

}
