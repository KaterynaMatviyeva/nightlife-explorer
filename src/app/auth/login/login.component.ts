import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { iUser } from '../../interfaces/i-user';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user!: iUser | null;
  constructor(private authSrv: AuthService) {
    // this.authSrv
    //   .restoreLogin()
    //   .pipe(
    //     switchMap((res) => {
    //       if (res.data) {
    //         this.authSrv.user.next(res.data);
    //       }
    //       return this.authSrv.user;
    //     })
    //   )
    //   .subscribe((res) => (this.user = res));

    this.authSrv.user.subscribe((res) => {
      this.user = res;
    });
  }

  onSubmit(loginForm: NgForm) {
    console.log(loginForm);
    const credentials = loginForm.form.value;
    this.authSrv.login(credentials).subscribe((res) => {
      if (res.data) {
        localStorage.setItem('token', res.data?.token);
        this.authSrv.user.next(res.data.user);
      }
    });
  }
}
