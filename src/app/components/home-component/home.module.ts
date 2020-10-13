import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { HomeComponent } from './home.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HumanComponent } from '../human/human.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    HumanComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'auth', component: HomeComponent },
    ])
  ],
  providers: [NgbActiveModal,LoginComponent, RegistrationComponent, HumanComponent,
              JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
