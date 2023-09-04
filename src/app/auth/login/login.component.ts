import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFromCreate!:FormGroup;
  isLoading=false;
  constructor(){
    this.loginFormCreate();
  }
  loginFormCreate(){
    this.loginFromCreate = new FormGroup({
      email:new FormControl(''),
      password:new FormControl('')
    })
  }
  login(){
    console.log('login sucess');
  }
  resetForm(){
    this.loginFromCreate.reset();
  }
}
