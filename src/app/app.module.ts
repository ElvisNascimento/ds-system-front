import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavComponent } from './components/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { JwtModule } from '@auth0/angular-jwt';
import { AsideComponent } from './components/aside/aside.component';
import { ToastModule } from 'primeng/toast';
import { CurriculosComponent } from './components/curriculos/curriculos.component';
import { UsersComponent } from './components/users/users.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    AsideComponent,
    CurriculosComponent,
    UsersComponent,
    AnalyticsComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ChartModule,
    FormsModule,
    ToastModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // allowedDomains: ['example.com'], // Domínios permitidos para o token
        // disallowedRoutes: ['http://example.com/api/auth'] // Rotas que não devem incluir o token
      }
    })
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('token');
}