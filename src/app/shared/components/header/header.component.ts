import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(private _router: Router, private _authService: AuthService) { }
  ngOnInit(): void {
    if (this._authService.getToken()) {
      this.isAuthenticated = true;
    }
    this._authService.authenticated.subscribe((authenticateResponse) => {
      if (authenticateResponse) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    })
  }
  login() {
    this._router.navigateByUrl('/auth/login');
  }
  signUp() {
    this._router.navigateByUrl('/auth/signup');
  }
  logout() {
    this._authService.logout();
    this._authService.authenticated.next(false);
  }
}
