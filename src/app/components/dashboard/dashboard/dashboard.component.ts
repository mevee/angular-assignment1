import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RepoService } from 'src/app/services/repo/repo.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedUser: User | null;
  users: User[];



  constructor(private session: SessionService, private repo: RepoService) {
    this.loggedUser = null;
    this.users = [];
  }

  ngOnInit(): void {
    this.loggedUser = this.session.getUser();
    this.loadAllUsers();
  }

  loadAllUsers() {
    var users = this.repo.getAllUser()
    this.users.concat(users)
  }
}


