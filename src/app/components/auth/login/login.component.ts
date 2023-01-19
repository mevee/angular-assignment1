import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session/session.service';
import { RouteConsts } from 'src/app/util/route-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private session: SessionService, private router: Router, private _snackBar: MatSnackBar) { }

  TAG: String = "LoginComponent"
  hide =true

  formData = {
    userId: '',
    password: "",
    mobile: "",
  }

  ngOnInit(): void {
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
      user.id =  this.formData.userId;
      user.name = this.formData.userId;
      user.password = "NA";
      user.role ="RANDOM-----";
      this.session.saveUser(user)
      this.router.navigate([RouteConsts.DASHBOARD]);
    }
  }

  showSnackBar(message?: string,) {
    var m1: string = message != null ? message : "No message found"
    this._snackBar.open(m1, "OK", { duration: 400 });
  }

}
