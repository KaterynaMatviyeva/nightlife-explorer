import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { iUser } from '../../interfaces/i-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user!: iUser | null;
  constructor(private authSrv: AuthService, private router: Router) {}

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
