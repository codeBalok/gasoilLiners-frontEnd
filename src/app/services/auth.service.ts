import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  redirectUrl = '';
  constructor(private router: Router) { }

  get getUserId(): Observable<string> {
    return this.userId.asObservable();
  }
  get getUserName(): Observable<string> {
    return this.userName.asObservable();
  }
  login() {
    if (localStorage.getItem('userId') !== '') {
      let user = JSON.parse(localStorage.getItem('user'));
      this.userId.next(user.id);
      this.userName.next(user.firstName + ' ' + user.lastName);
      this.loggedIn.next(true);
      if (this.redirectUrl === '') {
        this.router.navigate(['/dashboard']);
      } else {this.router.navigate([this.redirectUrl]); }
    } else { this.logout(); }
  }
  logout() {
    this.loggedIn.next(false);
    this.userId.next('');
    this.userName.next('');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
