import { Injectable } from '@angular/core';
import { serviceEndpoint } from 'src/app/constants/serviceEndpoint';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService: HttpService) { }
  private loginEndPoint = serviceEndpoint.accountModule;

   // Post User Login
   public postLogin(obj: any) {
    return this.httpService.Post(this.loginEndPoint.postLogin, obj);
  }
}
