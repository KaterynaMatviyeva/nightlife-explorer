import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { iUser } from '../../interfaces/i-user';
import { switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user!: iUser | null;
  constructor(private authSrv: AuthService, private router: Router) {
    this.authSrv
      .restoreLogin()
      .pipe(
        switchMap((res) => {
          if (res && res.data) {
            this.authSrv.user.next(res.data.user);
            console.log('Utente ripristinato:', res.data.user);
          }

          return this.authSrv.user.asObservable();
        })
      )
      .subscribe((res) => (this.user = res));

    this.authSrv.user.subscribe((res) => {
      this.user = res;
    });
  }

  onSubmit(loginForm: NgForm) {
    console.log(loginForm);
    const credentials = loginForm.form.value;
    this.authSrv.login(credentials).subscribe((res) => {
      if (res.data) {
        this.authSrv.user.next(res.data.user);
        loginForm.reset();
        this.router.navigate(['']);
        console.log('LocalStorage token:', localStorage.getItem('token'));
      }
    });
  }
}
