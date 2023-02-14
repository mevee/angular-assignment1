import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RepoService } from 'src/app/services/repo/repo.service';
import { SessionService } from 'src/app/services/session/session.service';
import { RouteConsts } from 'src/app/util/route-constants';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { LogoutDialogeComponent } from '../../logout-dialoge/logout-dialoge.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedUser: User | null;
  sideNavOpened = false

  constructor(private session: SessionService,
    private repo: RepoService, private router: Router, public dialog: MatDialog) {
    this.loggedUser = null;
    // this.users = [];
  }

  ngOnInit(): void {
    this.loggedUser = this.session.getUser();
    this.loadAllUsers();
    this.navigetTo(0);
  }

  loadAllUsers() {
    // var users = this.repo.getAllUser()
    // this.users.concat(users)
  }

  toggle(hideSidemenu: boolean | null = null) {
    if (hideSidemenu != null) {
      this.sideNavOpened = hideSidemenu
    } else {
      this.sideNavOpened = !this.sideNavOpened
    }
  }

  navigetTo(index: number) {
    if (index == 0) {
      this.router.navigate([RouteConsts.DASHBOARD + '/' + RouteConsts.USER_LIST], { replaceUrl: true });
    } else if (index == 1) {
      this.repo.resetCurrrentUser();
      this.router.navigate([RouteConsts.DASHBOARD + '/' + RouteConsts.ADD_USER], { replaceUrl: true });
    }
    this.toggle(false)
  }
  // logout() {
  //   console.log("DashboardComponent ", "logout()")
  //   alert("this is logout alert")
  //   // this.session.logout();
  //   // this.router.navigate([RouteConsts.LOGIN]);


  // }

  // logout(): void {
  //   const dialogRef = this.¸.open(DialogOverviewExampleDialog, {
  //     data: {name: this.name, animal: this.animal},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(LogoutDialogeComponent, dialogConfig);
    // dialogConfig.position = {
    //   'top': '0',
    //   left: '0'
    // };

    // this.dialog.afterAllClosed.subscribe(() => {
    //   console.log("DashboardComponent subscribe()", "logout()")
    //   this.session.logout();
    //   this.router.navigate([RouteConsts.LOGIN]);
    // })

  }
}


