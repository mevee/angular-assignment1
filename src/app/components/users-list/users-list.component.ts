import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule, _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Session } from 'inspector';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { PeriodicElement } from 'src/app/models/user_table_element';
import { RepoService } from 'src/app/services/repo/repo.service';
import { SessionService } from 'src/app/services/session/session.service';
import { RouteConsts } from 'src/app/util/route-constants';
import { AddUserComponent } from '../add-user/add-user/add-user.component';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnChanges, AfterViewInit {
  _tag = "UsersListComponent :: "

  displayedColumns: string[] = ['name', 'password', 'role', 'action'];
  userList: MatTableDataSource<any> = new MatTableDataSource();
  searchKey = ''
  _originalList: User[];


  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.userList.sort = sort;
  }

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.userList.paginator = paginator;
  }

  pageIndex = 0
  length = 0;
  pageSize = 5;
  sortByName = false;
  pageSizeOptions = [5, 10, 25, 50];

  constructor(private session: SessionService, private repo: RepoService, private router: Router, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this._originalList = []
    console.log(this._tag + "constructor()")

  }

  ngOnInit(): void {
    console.log(this._tag + "ngOnInit()")

    this.setObservers()
    this.repo.createDummyUsersList()
    // this.userList.sort = this.sort;
  }

  ngAfterViewInit() {
    console.log(this._tag + "ngAfterViewInit()")

  }

  ngOnChanges() {
    console.log(this._tag + "ngOnChanges()")

  }

  filterItem(key?: EventTarget) {
    console.log(this._tag + "filterItem()")

    let filterValue = (key as HTMLInputElement).value;
    filterValue = filterValue?.trim(); // Remove whitespace
    filterValue = filterValue?.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue != null)
      this.userList.filter = filterValue;
  }

  ngOnDestroy() {
    console.log(this._tag + "ngOnDestroy()")

  }

  setObservers() {
    console.log(this._tag + "setObservers()")

    this.repo.getAllUser.subscribe((value) => {
      if (value.length > 0) {
        this._originalList = value
        this.length = value.length
        this.userList.data = value
        console.log(this._tag + "getAllUser.subscribe value.length>0")
      } else {
        this.length = 0
        console.log(this._tag + "getAllUser.subscribe value.length==0")
      }
    });

  }
  public handlePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.pageIndex + 1) * this.pageSize;
    const start = this.pageIndex * this.pageSize;
    const part = this._originalList.slice(start, end);
    this.userList = new _MatTableDataSource(part);
  }

  addItem() {
    console.log(this._tag + "addItem()")

    let user = new User();
    user.id = "Name" + Math.floor(Math.random() * 10000)
    user.name = "Name" + Math.floor(Math.random() * 10000)
    user.password = "Name@123456" + Math.floor(Math.random() * 10000)
    user.role = "manager"

    this.repo.addUser(user)
  }

  editUser(user: User) {
    console.log(this._tag + "editUser()" + user)
    this.repo.editUser(user);
    // this.router.navigate([RouteConsts.DASHBOARD + '/' + RouteConsts.ADD_USER]);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddUserComponent, dialogConfig);
  }


  showSnackBar(message?: string,) {
    var m1: string = message != null ? message : "No message found"
    this._snackBar.open(m1, "OK", { duration: 400 });
  }

}
