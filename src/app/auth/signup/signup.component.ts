import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpFromCreate!: FormGroup;
  isLoading = false;
  constructor() {
    this.loginFormCreate();
  }
  loginFormCreate() {
    this.signUpFromCreate = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }
  login() {
    console.log('login sucess');
  }
  resetForm() {
    this.signUpFromCreate.reset();
  }
}
