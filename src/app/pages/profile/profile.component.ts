import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';
import { iEditUser } from '../../interfaces/i-edit-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(public authSrv: AuthService) {}
  user!: iUser | null;
  // updateData: iEditUser = {};
  ngOnInit(): void {
    this.user = this.authSrv.getCurrentUser();
    console.log(this.user);
  }

  //tasto delete fa direttamente il metodo qua con allert sei sicuro? e fa logout e toglie il token dal local

  deleteUser() {
    if (!this.user) return;
    const confirmDelete = confirm(
      'Sei sicuro di voler eliminare il tuo account?'
    );
    if (!confirmDelete) return;

    this.authSrv.deleteUser(this.user.id).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          alert('Utente eliminato con successo');
          // Se è l’utente corrente, potresti fare logout:
          this.authSrv.logout();
        }
      },
      error: (err) => {
        console.error('Errore delete:', err);
      },
    });
  }
}
