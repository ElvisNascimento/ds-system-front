import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { CurriculosComponent } from './components/curriculos/curriculos.component';
import { UsersComponent } from './components/users/users.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';

const routes: Routes = [

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/curriculos',
    component: CurriculosComponent,
    outlet: 'curriculos',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'curriculos', component: CurriculosComponent },
      { path: 'analytics', component: AnalyticsComponent },
    ]
  },


  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
