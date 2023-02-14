import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { RouteConsts } from 'src/app/util/route-constants';

@Component({
  selector: 'app-logout-dialoge',
  templateUrl: './logout-dialoge.component.html',
  styleUrls: ['./logout-dialoge.component.css']
})
export class LogoutDialogeComponent implements OnInit {

  constructor(private session: SessionService,
    private router: Router, private dialogRef: MatDialogRef<LogoutDialogeComponent>) {
    // this.description = data.description;
    this.title = "Do you want to logout?"
  }
  title: string;

  ngOnInit(): void {

  }

  yes() {
    this.dialogRef.close();

    this.session.logout();
    this.router.navigate([RouteConsts.LOGIN]);
  }

  close() {
    this.dialogRef.close();
  }
}
