import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { RepoService } from 'src/app/services/repo/repo.service';
import { SessionService } from 'src/app/services/session/session.service';
import { RouteConsts } from 'src/app/util/route-constants';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private repository: RepoService, private router: Router, private _snackBar: MatSnackBar) {
    this._obsObject = new BehaviorSubject(new User())
  }

  TAG: String = "AddUserComponent"
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  loading = false
  hide = true
  formData = {
    userId: "",
    password: "",
    cPassword: "",
    role: "",
  }

  private _obsObject: BehaviorSubject<User>;

  ngOnInit(): void {
    this.repository.getCurrentUser.subscribe((value) => {
      console.log("AddUserComponent :: " + this.formData.role)

      if (value != null) {
        this.formData.userId = value.id!;
        this.formData.password = value.password!;
        this.formData.cPassword = value.password!;
        this.formData.role = value.role!;
       } else {
        this.clear()
      }
    });

  }
  clear() {
    this.formData.userId = "";
    this.formData.password = ""
    this.formData.cPassword = ""
    this.formData.role = ""
  }
  submit() {
    // console.log("onSubmit() of Register screen called");
    console.log("AddUserComponent :: submit() ", this.formData);

    if (this.formData.userId == "") {
      this.showSnackBar("User is required")
    }
    else if (this.formData.password == "") {
      this.showSnackBar("Password is required")
    } else if (this.formData.cPassword == "") {
      this.showSnackBar("Confrim password is required")
    } else if (this.formData.cPassword != this.formData.password) {
      this.showSnackBar("Password do not matched")
    } else if (this.formData.role == "") {
      this.showSnackBar("Please select")
    } else {
      this.showSnackBar("Congratulation user added success");

      let user = new User();
      user.id = this.formData.userId;
      user.name = this.formData.userId;
      user.password = this.formData.password;
      user.role = this.formData.role;
      this.repository.addUser(user)
      this.router.navigate([RouteConsts.DASHBOARD + '/' + RouteConsts.USER_LIST]);
    }
  }

  showSnackBar(message?: string,) {
    var m1: string = message != null ? message : "No message found"
    this._snackBar.open(m1, "OK", { duration: 400 });
  }




}
