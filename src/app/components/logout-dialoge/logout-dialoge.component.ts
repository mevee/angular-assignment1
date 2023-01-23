import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialoge',
  templateUrl: './logout-dialoge.component.html',
  styleUrls: ['./logout-dialoge.component.css']
})
export class LogoutDialogeComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LogoutDialogeComponent>) {
    // this.description = data.description;
    this.title="Do you want to logout?"
  }
  title: string;

  ngOnInit(): void {

  }

  yes() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
