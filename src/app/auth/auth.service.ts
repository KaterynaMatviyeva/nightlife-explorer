import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iLoginCredentials } from '../interfaces/i-login-credentials';
import { iApiResponse } from '../interfaces/i-api-response';
import { iAuthResponse } from '../interfaces/i-auth-response';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { iUser } from '../interfaces/i-user';
import { iRegisterRequest } from '../interfaces/i-register-request';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;
  userUrl: string = environment.userUrl;

  jwtHelper: JwtHelperService = new JwtHelperService();

  private logoutTimer: any;

  user = new BehaviorSubject<iUser | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.restoreLogin().subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error('Errore in restoreLogin:', err);
        },
      });
    }
  }

  register(registerData: iRegisterRequest) {
    return this.http
      .post<iApiResponse<iAuthResponse>>(this.registerUrl, registerData)
      .pipe(
        tap((res) => {
          //  loggato automaticamente dopo la registrazione,
          // salvo il token
          if (res.status === 'SUCCESS' && res.data) {
            localStorage.setItem('token', res.data.token);
            this.user.next(res.data.user);
            //  il timer 'auto-logout
            this.autoLogOut();
          }
        })
      );
  }

  login(credentials: iLoginCredentials) {
    return this.http
      .post<iApiResponse<iAuthResponse>>(this.loginUrl, credentials)
      .pipe(
        tap((res) => {
          if (res.status === 'SUCCESS' && res.data) {
            // Salvo token in localStorage
            localStorage.setItem('token', res.data.token);
            //michele consiglia di mettere tutta la response cioè user + token
            console.log('Token ricevuto dal server:', res.data.token);

            // Aggiorno lo stato dell’utente
            this.user.next(res.data.user);

            //  timer di logout
            this.autoLogOut();
          }
        })
      );
  }

  restoreLogin(): Observable<iApiResponse<iAuthResponse> | null> {
    const token = localStorage.getItem('token');
    // Se non c'è token o è scaduto, non chiamiamo il backend
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      console.log('Token valido?', !this.jwtHelper.isTokenExpired(token));
      return of(null);
    }

    return this.http.get<iApiResponse<iAuthResponse>>(this.userUrl).pipe(
      tap((res) => {
        if (res && res.status === 'SUCCESS' && res.data) {
          // Salvo i dati utente
          this.user.next(res.data.user);
          // timer di auto-logout
          this.autoLogOut();
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.user.next(null);
    this.router.navigate(['']);

    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  isUserLogin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    // Controlla scadenza
    return !this.jwtHelper.isTokenExpired(token);
  }

  getCurrentUser(): iUser | null {
    return this.user.value;
  }

  autoLogOut() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    const token = localStorage.getItem('token');
    if (!token) return;

    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    if (!expirationDate) return;

    const now = new Date().getTime();
    const expTime = expirationDate.getTime() - now;

    // Se scaduto slogga subito
    if (expTime <= 0) {
      this.logout();
      return;
    }

    // Se non è scaduto imposta un timer
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expTime);
  }
}
