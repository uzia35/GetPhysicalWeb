import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/app/interfaces/alert.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  confirmationCode: Number;
  isAccountConfirmed: boolean;
  isRegistered: boolean;
  alerts: Array<Alert>;
  constructor(
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService) {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^\S*$/)]),
      username: new FormControl('', [Validators.required, Validators.pattern(/^\S*$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^\S*$/)])
    });
    this.isAccountConfirmed = false;
    this.isRegistered = false;
    this.alerts = [];
  }

  ngOnInit(): void {
  }

  signUp(registrationForm) {
    this.authenticationService.signUp(registrationForm).subscribe(async userCredential => {
      await userCredential.user.updateProfile({ displayName: registrationForm.value.username });
      this.addAlert({ type: 'success', message: 'Account Successfully Created!' });
      setTimeout(() => this.modalService.dismissAll(),500);
    }, error => {
      this.addAlert({ type: 'danger', message: error.message });
    });
  }

  openRegistrationModal(registrationModal: any) {
    this.modalService.dismissAll();
    this.modalService.open(registrationModal, { size: 'sm', backdrop: 'static' })
  }

  openConfirmationModal(confirmationModal: any) {
    this.modalService.dismissAll();
    this.modalService.open(confirmationModal, { size: 'sm' });
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  addAlert(alertObj: Alert) {
    let itemExists = false;
    this.alerts.forEach(item => {if (item.message == alertObj.message) { itemExists = true;}});
    if(!itemExists){
      this.alerts.push(alertObj)
    }
  }
}