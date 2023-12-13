import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpFromCreate!: FormGroup;
  isLoading = false;
  constructor(private _authService: AuthService, private _routerService: Router) {
    this.signUpFormCreate();
  }
  signUpFormCreate() {
    this.signUpFromCreate = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }
  signUp() {
    this.isLoading = true;
    this._authService.createUser(this.signUpFromCreate.value.email, this.signUpFromCreate.value.password).subscribe((res) => {
      this._routerService.navigate(['/login']);
      this.isLoading = false;
    }, (err) => {
      console.log('error', err);
      this.isLoading = false;
    })
  }
  resetForm() {
    this.signUpFromCreate.reset();
  }
}
