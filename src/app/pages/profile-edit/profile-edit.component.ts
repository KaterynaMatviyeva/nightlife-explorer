import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iEditUser } from '../../interfaces/i-edit-user';
import { iUser } from '../../interfaces/i-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent {
  currentUser: iUser | null = null;
  updateData: iEditUser = {
    id: 0,
    email: '',
    username: '',
    password: '',
    role: '',
  };
  constructor(public authSrv: AuthService, private router: Router) {
    this.currentUser = this.authSrv.getCurrentUser();

    if (this.currentUser) {
      this.updateData.email = this.currentUser.email;
      this.updateData.username = this.currentUser.username;
      this.updateData.role = this.currentUser.role;
      this.updateData.password = this.currentUser.password;
    }
  }

  editUser() {
    if (!this.currentUser) return;
    this.authSrv.editUser(this.currentUser.id, this.updateData).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          alert('Utente aggiornato correttamente!');

          this.router.navigate(['/profile']);
        }
      },
      error: (err) => {
        console.error('Errore update:', err);
      },
    });
  }
}
