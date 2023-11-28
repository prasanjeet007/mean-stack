import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpService: HttpClient) { }
  createUser(email: string, password: string) {
    return this._httpService.post('http://localhost:3000/signup', { email, password });
  }
  getToken() {
    if (localStorage.getItem('token'))
      return JSON.parse(localStorage.getItem('token') || '');
  }
  login(email: string, password: string) {
    return this._httpService.post("http://localhost:3000/login", { email, password });
  }
}
