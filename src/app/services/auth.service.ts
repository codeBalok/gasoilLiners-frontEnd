import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) { }
  login() {
    if (localStorage.getItem('userId') !== '') {
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }
  }
  logout() {
    this.loggedIn.next(false);
    localStorage.setItem('userId', '');
    this.router.navigate(['/login']);
  }
}
