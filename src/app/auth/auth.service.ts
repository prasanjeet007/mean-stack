import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpService: HttpClient, private _routerService: Router) {

  }
  createUser(email: string, password: string) {
    return this._httpService.post('http://localhost:3000/signup', { email, password });
  }
  getToken() {
    if (sessionStorage.getItem('token'))
      return JSON.parse(sessionStorage.getItem('token') || '');
  }
  login(email: string, password: string) {
    return this._httpService.post("http://localhost:3000/login", { email, password });
  }
  logout() {
    sessionStorage.removeItem('token');
    this._routerService.navigate(['/login']);
  }
}
