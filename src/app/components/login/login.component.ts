import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Alert } from 'src/app/interfaces/alert.interface';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  alerts: Array<Alert>;
  constructor(
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^\S*$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^\S*$/)])
    });
    this.alerts = []
  }

  ngOnInit(): void {

  }

  signIn() {
    this.authenticationService.signIn(this.loginForm).subscribe(userCredential => {
      this.addAlert({ type: 'success', message: 'Logged In Successfully!' });
      userCredential.user.getIdToken().then(token => {
        this.localStorageService.store("authToken", token)
      }, error => {
        this.addAlert({ type: 'danger', message: error.message });
      })
      setTimeout(() => this.modalService.dismissAll(), 500);
    }, error => {
      this.addAlert({ type: 'danger', message: error.message });
    });
  }

  open(loginModal: any) {
    this.modalService.open(loginModal, { size: 'sm', backdrop: 'static' })
  }

  addAlert(alertObj: Alert) {
    let itemExists = false;
    this.alerts.forEach(item => { if (item.message == alertObj.message) { itemExists = true; } });
    if (!itemExists) {
      this.alerts.push(alertObj)
    }
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
