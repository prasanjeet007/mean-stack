import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthIntercepter implements HttpInterceptor {
    constructor(private _authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this._authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', "Bearer " + token)
        })
        return next.handle(authRequest);
    }
}