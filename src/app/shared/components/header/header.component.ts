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
  }
  login() {
    this._router.navigateByUrl('/login');
  }
  signUp() {
    this._router.navigateByUrl('/signup');
  }
  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
