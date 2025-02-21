import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { iEvent } from '../../../interfaces/i-event';
import { iUser, Role } from '../../../interfaces/i-user';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
})
export class MyEventsComponent implements OnInit {
  myEvents$: Observable<iEvent[]> = of([]);
  currentUser: iUser | null = null;

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Ottieni l'utente corrente dal service di autenticazione
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser && this.currentUser.role === Role.ORGANIZER) {
      // Filtra gli eventi per mostrare solo quelli creati dall'organizzatore corrente
      this.myEvents$ = this.eventService
        .getAllEvents()
        .pipe(
          map((events: iEvent[]) =>
            events.filter((event) => event.organizerId === this.currentUser?.id)
          )
        );
    } else {
      // Se l'utente non è un organizzatore, mostra un array vuoto (oppure gestisci un'altra logica)
      this.myEvents$ = of([]);
    }
  }

  onDeleteEvent(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo evento?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => alert('Evento eliminato con successo'),
        error: (err: Error) =>
          console.error("Errore durante l'eliminazione:", err),
      });
    }
  }
}
