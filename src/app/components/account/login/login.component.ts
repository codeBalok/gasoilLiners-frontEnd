import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpService: HttpService, private authService: AuthService) {
    if (!isNullOrUndefined(localStorage.getItem('userId'))) {
      this.authService.login();
    }
   }

  public login = {
    'Username': '',
    'Password': ''
  };

  ngOnInit() {
  }

  doLogin(form: FormGroup) {
    console.log(form);
    localStorage.setItem('userId', '1');
    this.authService.login();
  }
}
