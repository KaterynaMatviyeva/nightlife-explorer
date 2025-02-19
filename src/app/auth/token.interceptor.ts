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
    // Recupera il token da localStorage (se esiste)
    const token = localStorage.getItem('token');
    console.log('[Interceptor] token =', token, 'request.url =', request.url);

    // Se il token c'è, clona la richiesta e aggiunge l'header Authorization
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Prosegue con la richiesta e gestisce eventuali errori
    return next.handle(request).pipe(
      catchError((error) => {
        // Se ricevi un errore, ad esempio 401, potresti voler fare il logout
        // o resettare lo stato dell'utente
        this.authSrv.user.next(null);
        return throwError(() => error);
      })
    );
  }

  // intercept(
  //   request: HttpRequest<unknown>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<unknown>> {
  //   const clone = request.clone();
  //   headers: request.headers.set(
  //     'authorization',
  //     `Bearer ${localStorage.getItem('token')}`
  //   );
  //   return next.handle(clone).pipe(
  //     catchError((error) => {
  //       this.authSrv.user.next(null);
  //       return throwError(error);
  //     })
  //   );
  // }
}
