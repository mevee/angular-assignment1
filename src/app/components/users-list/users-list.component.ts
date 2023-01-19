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

  constructor(private respo: RepoService) {
    this.userList = respo.getAllUser();
  }

  ngOnInit(): void {

    this.respo.userObs.subscribe(
      val => { 
        console.log("UsersListComponent :: "+val)
       },
      error => console.log("error"),
      () => console.log("complete"))
  }

}
