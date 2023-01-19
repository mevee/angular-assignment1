import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RepoService } from 'src/app/services/repo/repo.service';
import { SessionService } from 'src/app/services/session/session.service';
import { RouteConsts } from 'src/app/util/route-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedUser: User | null;
  users: User[];
  sideNavOpened = false


  constructor(private session: SessionService,
    private repo: RepoService, private router: Router) {
    this.loggedUser = null;
    this.users = [];
  }

  ngOnInit(): void {
    this.loggedUser = this.session.getUser();
    this.loadAllUsers();
   this.navigetTo(0);
  }

  loadAllUsers() {
    var users = this.repo.getAllUser()
    this.users.concat(users)
  }
  
  toggle(hideSidemenu:boolean|null=null) {
    if(hideSidemenu!=null){
      this.sideNavOpened = hideSidemenu
    }else{
      this.sideNavOpened = !this.sideNavOpened
    }
  }

  navigetTo(index: number) {
    if (index == 0) {
      this.router.navigate([RouteConsts.DASHBOARD+'/'+RouteConsts.USER_LIST]);
    } else if (index == 1) {
      this.router.navigate([RouteConsts.DASHBOARD+'/'+RouteConsts.ADD_USER]);
    }
    this.toggle(false)

  }
  logout() {
    console.log("DashboardComponent ", "logout()")
    alert("this is logout alert")
    // this.session.logout();
    // this.router.navigate([RouteConsts.LOGIN]);
  }
}


