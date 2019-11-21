import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { isNullOrUndefined } from 'util';
import { AccountService } from '../account.service';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private errorMessage = '';
  constructor(private httpService: HttpService, private authService: AuthService, private accountService: AccountService) {
    if (!isNullOrUndefined(localStorage.getItem('userId'))) {
      this.authService.login();
    }
   }

  public login = {
    'Username': '',
    'Password': ''
  };

  ngOnInit() {
    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  }

  doLogin(form: FormGroup) {
    this.accountService.postLogin({'Username': form.value.Username, 'Password': form.value.Password}).subscribe((data: any) => {
      if (data.status === 1) {
        localStorage.setItem('userId', data.id);
        localStorage.setItem('user', JSON.stringify(data));
        this.authService.login();
      } else { this.errorMessage = data.message; }
    });
  }
}
