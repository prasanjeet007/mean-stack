import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFromCreate!: FormGroup;
  isLoading = false;
  constructor(private _authService: AuthService, private _routerService: Router) {
    this.loginFormCreate();
  }
  ngOnInit(): void {
    if (this._authService.getToken()) {
      this._routerService.navigateByUrl('/posts');
    }
  }
  loginFormCreate() {
    this.loginFromCreate = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }
  login() {
    this.isLoading = true;
    this._authService.login(this.loginFromCreate.value.email, this.loginFromCreate.value.password).pipe(map((res: any) => res.token)).subscribe((response) => {
      sessionStorage.setItem('token', JSON.stringify(response));
      this.isLoading = false;
      this._authService.authenticated.next(true);
      this._routerService.navigate(['/posts']);
    }, (err) => {
      this.isLoading = false;
    })
  }

  resetForm() {
    this.loginFromCreate.reset();
  }
}
