import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RepoService } from 'src/app/services/repo/repo.service';
import { SessionService } from 'src/app/services/session/session.service';
import { RouteConsts } from 'src/app/util/route-constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private session: SessionService, private repo: RepoService, private router: Router, private _snackBar: MatSnackBar) { }

  TAG: String = "LoginComponent"
  hide = true
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  loading = false

  formData = {
    userId: "vikesh",
    password: "",
    mobile: ""
  }

  ngOnInit(): void {
    if (this.session.checkIfLoggedIn()) {
      this.router.navigate([RouteConsts.DASHBOARD]);
    }
  }


  submit() {
    // console.log("onSubmit() of Register screen called");
    console.log("DATA", this.formData);

    if (this.formData.userId == "") {
      this.showSnackBar("User is required")
    }
    else if (this.formData.password == "") {
      this.showSnackBar("Password is required")
    } else {
      this.showSnackBar("Congratulation you are registered Success");

      let user = new User();
      user.id = this.formData.userId;
      user.name = this.formData.userId;
      user.password = this.formData.password;
      user.role = "NA";
      this.loading = true
      setTimeout(() => {
        this.loading = false

        this.session.saveUser(user)
        this.addLoggedUserToList()
        this.router.navigate([RouteConsts.DASHBOARD]);
      }, 2000);


    }
  }
  addLoggedUserToList() {
    let user = this.session.getUser()
    if (user != undefined) {
      this.repo.resetList()
      this.repo.addUser(user)
    }
  }

  showSnackBar(message?: string,) {
    var m1: string = message != null ? message : "No message found"
    this._snackBar.open(m1, "OK", { duration: 400 });
  }

}
