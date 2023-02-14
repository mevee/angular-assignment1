import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Z_FULL_FLUSH } from 'zlib';
import { AppComponent } from './app.component';
import { AddUserComponent } from './components/add-user/add-user/add-user.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { RouteConsts } from './util/route-constants';

const routes: Routes = [
  {
    path: RouteConsts.SPLASH,
    component: AppComponent,
    pathMatch: 'full',
  },
  {
    path: RouteConsts.LOGIN,
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: RouteConsts.DASHBOARD,
    component: DashboardComponent,
    children: [
      {
        path: RouteConsts.ADD_USER,
        component: AddUserComponent,
      },
      {
        path: RouteConsts.USER_LIST,
        component: UsersListComponent,
      }
    ],
  },
  {
    path: RouteConsts.ADD_USER,
    component: AddUserComponent,
    pathMatch: 'full',
  },

  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
