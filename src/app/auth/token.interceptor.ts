import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSrv: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clone = request.clone();
    headers: request.headers.set(
      'authorization',
      ` Bearer ${localStorage.getItem('token')}`
    );
    return next.handle(clone).pipe(
      catchError((error) => {
        this.authSrv.user.next(null);
        return throwError(error);
      })
    );
  }
}
