import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private session: SessionService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submit() {
    this.snackbar.open('hi this is tezt snack bar');

  }

}
