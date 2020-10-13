import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  userInfo: any;
  constructor(private jwtHelperService: JwtHelperService,
    private localStorageService: LocalStorageService) {
    this.userInfo = this.jwtHelperService.decodeToken(this.localStorageService.retrieve("authToken"));
  }

  ngOnInit(): void {
    this.localStorageService.observe("authToken").subscribe((authToken) => {
      this.userInfo = this.jwtHelperService.decodeToken(authToken)
    });
  }
  
}
