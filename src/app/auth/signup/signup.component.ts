import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpFromCreate!: FormGroup;
  isLoading = false;
  constructor(private _authService: AuthService) {
    this.signUpFormCreate();
  }
  signUpFormCreate() {
    this.signUpFromCreate = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }
  signUp() {
    this._authService.createUser(this.signUpFromCreate.value.email, this.signUpFromCreate.value.password).subscribe((res) => {
      console.log('response of signup', res);
    })
  }
  resetForm() {
    this.signUpFromCreate.reset();
  }
}
