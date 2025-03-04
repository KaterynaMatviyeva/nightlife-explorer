import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { iEvent } from '../../interfaces/i-event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  events$: Observable<iEvent[]>;

  constructor(private eventService: EventService) {
    this.events$ = this.eventService.getAllEvents();
  }

  ngOnInit(): void {
    // La lista viene caricata all'interno del service, grazie al BehaviorSubject
  }

  // Metodo per salvare l'evento nei preferiti (esempio)
  // onSaveEvent(eventId: number): void {
  //   this.eventService.saveEvent(eventId).subscribe({
  //     next: () => alert('Evento salvato nei preferiti!'),
  //     error: (err: Error) =>
  //       console.error("Errore nel salvataggio dell'evento:", err),
  //   });
  // }
}
