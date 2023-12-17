import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../angular-material.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService } from "./auth.service";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
    declarations: [LoginComponent,
        SignupComponent],
    imports: [CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        AngularMaterialModule],
    providers: [AuthService]
})
export class AuthModule { }