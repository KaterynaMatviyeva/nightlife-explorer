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
    this.currentUser = this.authService.getCurrentUser();
    console.log('utente ', this.currentUser);

    if (this.currentUser && this.currentUser.role === Role.ORGANIZER) {
      console.log(Role.ORGANIZER, 'ruoloooo');

      this.myEvents$ = this.eventService.getAllEvents().pipe();
    } else {
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
