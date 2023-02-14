import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './services/session/session.service';
import { RouteConsts } from './util/route-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-one';
  constructor(private session: SessionService, private router: Router) { }


  ngOnInit() {
    this.checkAndSetMainPage()
  }


  checkAndSetMainPage() {
    this.router.navigate([RouteConsts.LOGIN]);
  }
}
