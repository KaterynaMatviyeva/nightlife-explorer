import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { iRegisterRequest } from '../../interfaces/i-register-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errorMessage: string = '';

  constructor(private authSrv: AuthService, private router: Router) {}

  onSubmit(registerForm: NgForm) {
    if (registerForm.invalid) {
      this.errorMessage = 'Verifica i dati inseriti';

      return;
    }

    const registerData: iRegisterRequest = registerForm.value;
    this.authSrv.register(registerData).subscribe({
      next: (res) => {
        if (res.data) {
          console.log('Registrazione avvenuta con successo:', res);

          this.authSrv.user.next(res.data.user);
          registerForm.reset();
          alert('Registrazione avvenuta con successo');
          console.log('res.data.token:', res.data.token);
          this.router.navigate(['/auth/login']);
        }
      },
      error: (err) => {
        console.error('Errore durante la registrazione:', err);
        this.errorMessage = err.error?.message || 'Si è verificato un errore';
      },
    });
  }
}
