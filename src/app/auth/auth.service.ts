import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iLoginCredentials } from '../interfaces/i-login-credentials';
import { iApiResponse } from '../interfaces/i-api-response';
import { iAuthResponse } from '../interfaces/i-auth-response';
import { BehaviorSubject } from 'rxjs';
import { iUser } from '../interfaces/i-user';
import { iRegisterRequest } from '../interfaces/i-register-request';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;
  userUrl: string = environment.userUrl;

  constructor(private http: HttpClient) {}

  user = new BehaviorSubject<iUser | null>(null);

  register(registerData: iRegisterRequest) {
    return this.http.post<iApiResponse<iAuthResponse>>(
      // this.registerUrl,
      'http://localhost:8080/api/auth/register',
      registerData
    );
  }

  login(credentials: iLoginCredentials) {
    return this.http.post<iApiResponse<iAuthResponse>>(
      this.loginUrl,
      credentials
    );
  }

  restoreLogin() {
    return this.http.get(this.userUrl);
  }
}
