import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, catchError, throwError } from "rxjs";
import { ErrorDialogComponent } from "./error-dialog.component";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _dialogService: MatDialog) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            this._dialogService.open(ErrorDialogComponent, {
                width: '350px',
                enterAnimationDuration: '400ms',
                exitAnimationDuration: '300ms'
            });
            return throwError(error);
        }));
    }
}