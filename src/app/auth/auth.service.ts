import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = new BehaviorSubject<boolean>(false);
  constructor(private _httpService: HttpClient, private _routerService: Router) {

  }
  createUser(email: string, password: string) {
    return this._httpService.post(`${environment.api_Url}signup`, { email, password });
  }
  getToken() {
    if (sessionStorage.getItem('token'))
      return JSON.parse(sessionStorage.getItem('token') || '');
  }
  login(email: string, password: string) {
    return this._httpService.post(`${environment.api_Url}login`, { email, password });
  }
  logout() {
    sessionStorage.removeItem('token');
    this._routerService.navigate(['/login']);
  }
}
