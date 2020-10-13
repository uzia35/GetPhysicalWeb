import { Injectable } from '@angular/core';
import { Observable, of, from, BehaviorSubject} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  signUp(registrationForm) : Observable<auth.UserCredential> {
    return from(this.auth.createUserWithEmailAndPassword(registrationForm.value.email, registrationForm.value.password));
  }

  signIn(loginForm) : Observable<auth.UserCredential>  {
    return from(this.auth.signInWithEmailAndPassword(loginForm.value.email,loginForm.value.password));
  }

  getUser(): Observable<firebase.User>{
    return from(this.auth.currentUser)
  }

  getSignUpInfo(registrationForm): Observable<any> {
    console.log("registrationForm", registrationForm);
    return null;
  }

}
